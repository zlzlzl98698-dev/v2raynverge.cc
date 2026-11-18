import { getCollection } from 'astro:content';

export interface UnifiedContentItem {
  id: string;
  slug: string;
  collection: 'articles' | 'reviews' | 'guides' | 'comparisons';
  url: string;
  title: string;
  description: string;
  excerpt: string;
  pubDate: string;
  updatedDate: string;
  category: 'airport' | 'vpn' | 'clash' | 'resources';
  categoryLabel: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  author: string;
  readingTimeMinutes: number;
  wordCount: number;
  featured: boolean;
  pillar: boolean;
  draft: boolean;
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedBrands: string[];
  relatedSlugs: string[];
  faq: { question: string; answer: string }[];
  sources: { title: string; note: string; date: string }[];
  priceVerifiedDate: string;
  testDate: string;
  reviewStatus: string;
  body: string;
}

const CATEGORY_NAME_MAP: Record<'airport' | 'vpn' | 'clash' | 'resources', string> = {
  airport: '机场推荐',
  vpn: 'VPN 与加速器',
  clash: 'Clash 客户端',
  resources: '资源与情报',
};

export function estimateReadingTime(text: string): { minutes: number; chars: number } {
  const cleanText = (text || '').replace(/[#*`>\-\[\]\(\)!]/g, '').trim();
  const chars = cleanText.length;
  const minutes = Math.max(4, Math.ceil(chars / 420));
  return { minutes, chars };
}

export async function getAllPublishedContent(): Promise<UnifiedContentItem[]> {
  const [articles, reviews, guides, comparisons] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('reviews', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
  ]);

  const normalize = (
    entry: any,
    collection: 'articles' | 'reviews' | 'guides' | 'comparisons'
  ): UnifiedContentItem => {
    const slug = entry.data.slug || entry.id.replace(/\.(md|mdx)$/, '');
    const { minutes, chars } = estimateReadingTime(entry.body || '');
    return {
      id: entry.id,
      slug,
      collection,
      url: `/${collection}/${slug}/`,
      title: entry.data.title,
      description: entry.data.description,
      excerpt: entry.data.excerpt || entry.data.description,
      pubDate: entry.data.pubDate,
      updatedDate: entry.data.updatedDate,
      category: entry.data.category,
      categoryLabel: CATEGORY_NAME_MAP[entry.data.category as 'airport' | 'vpn' | 'clash' | 'resources'] || '机场推荐',
      tags: entry.data.tags || [],
      cover: entry.data.cover,
      coverAlt: entry.data.coverAlt || entry.data.title,
      author: entry.data.author,
      readingTimeMinutes: minutes,
      wordCount: chars,
      featured: Boolean(entry.data.featured),
      pillar: Boolean(entry.data.pillar),
      draft: Boolean(entry.data.draft),
      primaryKeyword: entry.data.primaryKeyword,
      secondaryKeywords: entry.data.secondaryKeywords || [],
      relatedBrands: entry.data.relatedBrands || [],
      relatedSlugs: entry.data.relatedSlugs || [],
      faq: entry.data.faq || [],
      sources: entry.data.sources || [],
      priceVerifiedDate: entry.data.priceVerifiedDate,
      testDate: entry.data.testDate,
      reviewStatus: entry.data.reviewStatus,
      body: entry.body || '',
    };
  };

  const all = [
    ...articles.map((e) => normalize(e, 'articles')),
    ...reviews.map((e) => normalize(e, 'reviews')),
    ...guides.map((e) => normalize(e, 'guides')),
    ...comparisons.map((e) => normalize(e, 'comparisons')),
  ];

  return all.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));
}

export function extractHeadingsFromMarkdown(markdown: string): { depth: number; text: string; slug: string }[] {
  const lines = (markdown || '').split('\n');
  const headings: { depth: number; text: string; slug: string }[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const rawText = match[2].replace(/[*`~]/g, '').trim();
      const slug = rawText
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      headings.push({ depth, text: rawText, slug });
    }
  }
  return headings;
}
