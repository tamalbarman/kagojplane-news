import { getCollection } from 'astro:content';
import { CATEGORY_LIST } from '../utils/categories';

export async function GET(context) {
  const news = await getCollection('news');
  const siteUrl = context.site?.toString().replace(/\/$/, '') || 'https://thekagojplane.netlify.app';

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'hourly' },
    { url: '/privacy/', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms/', priority: '0.3', changefreq: 'yearly' },
    { url: '/contact/', priority: '0.5', changefreq: 'monthly' },
  ];

  const categoryPages = CATEGORY_LIST.map(cat => ({
    url: `/category/${cat.slug}/`,
    priority: '0.8',
    changefreq: 'daily',
  }));

  const articlePages = news.map(post => ({
    url: `/news/${post.id}/`,
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: post.data.pubDate.toISOString(),
  }));

  const allUrls = [...staticPages, ...categoryPages, ...articlePages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    item => `  <url>
    <loc>${siteUrl}${item.url}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
