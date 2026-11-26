import type { Config } from "@netlify/functions";

interface PublishPayload {
  action?: "verify" | "publish";
  password?: string;
  title?: string;
  slug?: string;
  description?: string;
  category?: string;
  categoryName?: string;
  author?: string;
  image?: string;
  imageCaption?: string;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  tags?: string[];
  body?: string;
  overwrite?: boolean;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80";

function sanitizeSlug(rawSlug: string | undefined, title: string): string {
  const source = (rawSlug && rawSlug.trim()) || title;
  const ascii = source
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  if (ascii.length >= 3) {
    return ascii;
  }

  const now = new Date();
  const stamp = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
    String(now.getUTCHours()).padStart(2, "0"),
    String(now.getUTCMinutes()).padStart(2, "0"),
    String(now.getUTCSeconds()).padStart(2, "0"),
  ].join("");
  return `news-${stamp}`;
}

function buildMarkdown(data: Required<Pick<PublishPayload, "title" | "category" | "body">> & PublishPayload): string {
  const pubDate = new Date().toISOString();
  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => t.trim()).filter(Boolean)
    : [];

  const lines: string[] = [
    "---",
    `title: ${JSON.stringify(data.title.trim())}`,
    `description: ${JSON.stringify((data.description || `${data.title.trim()} সংক্রান্ত বিস্তারিত তথ্য ও সর্বশেষ আপডেট।`).trim())}`,
    `pubDate: ${pubDate}`,
    `author: ${JSON.stringify((data.author || "দ্য কাগজপ্লেন বার্তা বিভাগ").trim())}`,
    `category: ${JSON.stringify(data.category.trim())}`,
  ];

  if (data.categoryName?.trim()) {
    lines.push(`categoryName: ${JSON.stringify(data.categoryName.trim())}`);
  }

  lines.push(`image: ${JSON.stringify((data.image || DEFAULT_IMAGE).trim())}`);

  if (data.imageCaption?.trim()) {
    lines.push(`imageCaption: ${JSON.stringify(data.imageCaption.trim())}`);
  }

  lines.push(`featured: ${Boolean(data.featured)}`);
  lines.push(`trending: ${Boolean(data.trending)}`);
  lines.push(`breaking: ${Boolean(data.breaking)}`);

  if (tags.length > 0) {
    lines.push("tags:");
    for (const tag of tags) {
      lines.push(`  - ${JSON.stringify(tag)}`);
    }
  } else {
    lines.push("tags: []");
  }

  lines.push("---", "", data.body.trim(), "");
  return lines.join("\n");
}

function toBase64Utf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export default async (req: Request) => {
  const adminPassword = Netlify.env.get("ADMIN_PASSWORD");
  const githubToken = Netlify.env.get("GITHUB_TOKEN");
  const githubRepo = Netlify.env.get("GITHUB_REPO") || "tamalbarman/kagojplane-news";
  const githubBranch = Netlify.env.get("GITHUB_BRANCH") || "master";

  if (!adminPassword || !githubToken) {
    return Response.json(
      {
        ok: false,
        error: "Server configuration missing: set ADMIN_PASSWORD and GITHUB_TOKEN in Netlify environment variables.",
      },
      { status: 500 }
    );
  }

  let payload: PublishPayload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON request body." }, { status: 400 });
  }

  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  const providedPassword = bearerToken || payload.password || "";

  if (!providedPassword || providedPassword !== adminPassword) {
    return Response.json({ ok: false, error: "Invalid admin password." }, { status: 401 });
  }

  if (payload.action === "verify") {
    return Response.json({ ok: true, authenticated: true });
  }

  if (!payload.title?.trim() || !payload.category?.trim() || !payload.body?.trim()) {
    return Response.json(
      { ok: false, error: "Title, category, and article body are required." },
      { status: 400 }
    );
  }

  const slug = sanitizeSlug(payload.slug, payload.title);
  const filePath = `src/content/news/${slug}.md`;
  const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;

  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "thekagojplane-admin-publisher",
  };

  // Check if file already exists to avoid accidental overwrites
  let existingSha: string | undefined;
  const checkRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(githubBranch)}`, {
    headers: ghHeaders,
  });

  if (checkRes.ok) {
    const existing = (await checkRes.json()) as { sha?: string };
    if (!payload.overwrite) {
      return Response.json(
        {
          ok: false,
          error: `An article with slug "${slug}" already exists. Change the URL slug or enable overwrite.`,
        },
        { status: 409 }
      );
    }
    existingSha = existing.sha;
  } else if (checkRes.status !== 404) {
    const errText = await checkRes.text();
    return Response.json(
      { ok: false, error: `GitHub lookup failed (${checkRes.status}): ${errText}` },
      { status: 502 }
    );
  }

  const markdown = buildMarkdown({
    ...payload,
    title: payload.title,
    category: payload.category,
    body: payload.body,
  });

  const commitMessage = existingSha
    ? `Update news article via Admin Studio: ${slug}`
    : `Publish news article via Admin Studio: ${slug}`;

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers: ghHeaders,
    body: JSON.stringify({
      message: commitMessage,
      content: toBase64Utf8(markdown),
      branch: githubBranch,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    return Response.json(
      { ok: false, error: `GitHub commit failed (${putRes.status}): ${errText}` },
      { status: 502 }
    );
  }

  const result = (await putRes.json()) as {
    commit?: { html_url?: string; sha?: string };
  };

  return Response.json({
    ok: true,
    slug,
    path: filePath,
    articleUrl: `/news/${slug}/`,
    commitUrl: result.commit?.html_url || null,
    commitSha: result.commit?.sha || null,
  });
};

export const config: Config = {
  path: "/api/publish-post",
  method: ["POST"],
};
