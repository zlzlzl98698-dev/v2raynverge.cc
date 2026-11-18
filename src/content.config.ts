import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseContentSchema = z.object({
  title: z.string().min(4, '文章标题不能为空且需大于4个字符'),
  description: z.string().min(10, 'Meta Description 不能为空'),
  slug: z.string().optional(),
  pubDate: z.string().default('2026-10-19'),
  updatedDate: z.string().default('2026-11-18'),
  category: z.enum(['airport', 'vpn', 'clash', 'resources']).default('airport'),
  topicSlug: z.string().optional(),
  clusterId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().default('/images/covers/default-editorial.svg'),
  coverAlt: z.string().default('v2rayn指南 专业评测与技术图解封面'),
  author: z.string().default('v2rayn指南网络评测室'),
  excerpt: z.string().optional(),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  relatedSlugs: z.array(z.string()).default([]),
  pillar: z.boolean().default(false),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  canonical: z.string().optional(),
  sources: z
    .array(
      z.object({
        title: z.string(),
        note: z.string(),
        date: z.string().default('2026-10-19'),
      })
    )
    .default([]),
  // 扩展 SEO / GEO 与品牌评测关联字段
  relatedBrands: z.array(z.string()).default([]),
  searchIntent: z.string().default('信息获取与商业调查'),
  primaryKeyword: z.string().default('v2rayn指南'),
  secondaryKeywords: z.array(z.string()).default([]),
  priceVerifiedDate: z.string().default('2026-10-19'),
  testDate: z.string().default('2026-10-19'),
  reviewStatus: z.enum(['verified', 'measured', 'vendor_disclosed', 'historical']).default('verified'),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: baseContentSchema,
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: baseContentSchema.extend({
    brandSlug: z.string().default('guangsuyun'),
    overallRating: z.number().min(1).max(10).default(9.0),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: baseContentSchema.extend({
    osPlatform: z.string().default('Windows / macOS / Android / iOS'),
    clientName: z.string().default('v2rayN / Clash Verge Rev'),
    difficulty: z.string().default('新手至进阶'),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: baseContentSchema.extend({
    comparedItems: z.array(z.string()).default([]),
    comparisonDimension: z.string().default('专线架构、延迟吞吐、月均价格与解锁能力'),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: baseContentSchema,
});

export const collections = {
  articles,
  reviews,
  guides,
  comparisons,
  topics,
};
