import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const news = await getCollection('news');
  const sorted = news.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'দ্য কাগজপ্লেন (The Kagojplane)',
    description: 'দৈনন্দিন ব্যবসা, শেয়ার বাজার, অর্থনীতি ও সরকারি খবরের বিশ্বস্ত পোর্টাল',
    site: context.site || 'https://thekagojplane.netlify.app',
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description || '',
      link: `/news/${post.id}/`,
      author: post.data.author,
      categories: [post.data.category],
    })),
    customData: `<language>bn</language>`,
  });
}
