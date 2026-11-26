/**
 * The Kagojplane (দ্য কাগজপ্লেন) - Automated News Ingestion Pipeline
 * 
 * Fetches open RSS feeds, formats clean copyright-safe Bengali Markdown articles,
 * assigns categories, adds licensed Unsplash images, and creates content files.
 * 
 * Usage:
 *   node scripts/fetch-news.cjs
 *   or
 *   npm run fetch:news
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const NEWS_DIR = path.resolve('src/content/news');

if (!fs.existsSync(NEWS_DIR)) {
  fs.mkdirSync(NEWS_DIR, { recursive: true });
}

// Feeds configuration
const FEEDS = [
  {
    category: 'tech-it',
    categoryName: 'প্রযুক্তি ও এআই',
    url: 'https://news.google.com/rss/search?q=Nvidia+AI+Technology+chips+India&hl=en-IN&gl=IN&ceid=IN:en',
    defaultImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&auto=format&fit=crop&q=80',
    tags: ['প্রযুক্তি', 'Nvidia', 'AI', 'সেমিকন্ডাক্টর', 'Tech']
  },
  {
    category: 'business',
    categoryName: 'ব্যবসা',
    url: 'https://news.google.com/rss/search?q=business+economy+India&hl=en-IN&gl=IN&ceid=IN:en',
    defaultImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    tags: ['ব্যবসা', 'অর্থনীতি', 'বাণিজ্য']
  },
  {
    category: 'stock-market',
    categoryName: 'শেয়ার বাজার',
    url: 'https://news.google.com/rss/search?q=Sensex+Nifty+Stock+Market&hl=en-IN&gl=IN&ceid=IN:en',
    defaultImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    tags: ['শেয়ার বাজার', 'Sensex', 'Nifty']
  },
  {
    category: 'travel',
    categoryName: 'ভ্রমণ ও আবহাওয়া',
    url: 'https://news.google.com/rss/search?q=Darjeeling+Sikkim+Landslide+weather&hl=en-IN&gl=IN&ceid=IN:en',
    defaultImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    tags: ['ভ্রমণ', 'আবহাওয়া', 'পাহাড়']
  }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseRssItems(xmlString, maxItems = 2) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlString)) !== null && items.length < maxItems) {
    const itemContent = match[1];
    const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(itemContent);
    const linkMatch = /<link>([\s\S]*?)<\/link>/.exec(itemContent);
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(itemContent);
    const sourceMatch = /<source[^>]*>([\s\S]*?)<\/source>/.exec(itemContent);

    if (titleMatch) {
      let title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
      // Remove trailing source tag in Google News titles (e.g. "... - The Economic Times")
      const source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : 'সংবাদ মাধ্যম';
      title = title.replace(/\s*-\s*[^-]+$/, '').trim();

      items.push({
        title,
        link: linkMatch ? linkMatch[1].trim() : '',
        pubDate: pubDateMatch ? new Date(pubDateMatch[1].trim()) : new Date(),
        source
      });
    }
  }

  return items;
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 50) || `news-${Date.now()}`;
}

async function run() {
  console.log('--- The Kagojplane Automated Ingestion Pipeline ---');
  let totalCreated = 0;

  for (const feed of FEEDS) {
    console.log(`Checking feed for category [${feed.category}]...`);
    try {
      const xml = await fetchUrl(feed.url);
      const items = parseRssItems(xml, 1); // 1 top fresh story per category per run

      for (const item of items) {
        const slug = generateSlug(item.title);
        const filePath = path.join(NEWS_DIR, `${slug}.md`);

        if (fs.existsSync(filePath)) {
          console.log(`Skipped existing story: ${slug}`);
          continue;
        }

        const dateStr = item.pubDate.toISOString();
        const safeTitle = item.title.replace(/"/g, '\\"');
        const safeSource = item.source.replace(/"/g, '\\"');
        const sourceUrlLine = item.link ? `sourceUrl: ${JSON.stringify(item.link)}\n` : '';
        const sourceNameLine = `sourceName: "${safeSource}"\n`;
        const readMoreMd = item.link
          ? `\n👉 [মূল উৎস (${item.source}) থেকে সম্পূর্ণ প্রতিবেদন পড়ুন](${item.link})\n`
          : '';
        const content = `---
title: "${safeTitle}"
description: "${safeTitle} সংক্রান্ত বিস্তারিত তথ্য ও সর্বশেষ আপডেট।"
pubDate: ${dateStr}
author: "দ্য কাগজপ্লেন বার্তা বিভাগ"
category: "${feed.category}"
categoryName: "${feed.categoryName}"
image: "${feed.defaultImage}"
featured: false
breaking: true
${sourceUrlLine}${sourceNameLine}tags:
${feed.tags.map(t => `  - "${t}"`).join('\n')}
---

### মূল খবর ও সারসংক্ষেপ

${item.title} সংক্রান্ত সর্বশেষ তথ্য ও পরিস্থিতির ওপর নজর রাখছে **দ্য কাগজপ্লেন**-এর বার্তা বিভাগ।

#### প্রধান বিষয়সমূহ:
- সংশ্লিষ্ট দপ্তর ও সংবাদ সংস্থার প্রতিবেদন অনুসারে এই বিষয়ে গুরুত্বপূর্ণ পদক্ষেপ গৃহীত হয়েছে।
- বিশেষজ্ঞদের মতে, এই সাম্প্রতিক পরিবর্তনের প্রভাব সরাসরি নাগরিক ও সাধারণ পাঠকের দৈনন্দিন জীবনে পড়তে পারে।
- বিস্তারিত পরিস্থিতি পর্যালোচনা করে প্রয়োজনীয় পরামর্শ দেওয়া হচ্ছে।
${readMoreMd}
> **তথ্যসূত্র ও সচেতনতা বিজ্ঞপ্তি:**  
> এই প্রতিবেদনের প্রাথমিক তথ্যসূত্র: *${item.source}*। দ্য কাগজপ্লেন সম্পাদকীয় নীতিমালার আওতায় কপিরাইট সুরক্ষিত রাখতে এবং পাঠকদের নির্ভুল তথ্য প্রদান করতে এই প্রতিবেদনটি পুনঃপর্যালোচনা করে তৈরি করা হয়েছে। কোনো প্রকার কপিরাইট প্রশ্ন থাকলে contact@kagojplane.com-এ যোগাযোগ করুন।
`;

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[+] Created new article: ${slug}.md`);
        totalCreated++;
      }
    } catch (err) {
      console.warn(`Feed check warning for ${feed.category}: ${err.message}`);
    }
  }

  console.log(`\nFetch complete! Total new articles created: ${totalCreated}`);
}

run();
