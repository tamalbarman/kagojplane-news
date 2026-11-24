import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string().default('দ্য কাগজপ্লেন বার্তা বিভাগ'),
    category: z.string(),
    categoryName: z.string().optional(),
    image: z.string().default('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80'),
    imageCaption: z.string().optional(),
    featured: z.boolean().default(false),
    trending: z.boolean().default(false),
    breaking: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  news: newsCollection,
};
