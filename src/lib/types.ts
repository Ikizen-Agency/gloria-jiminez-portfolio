export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  heroImageUrl: string;
  heroImageHint: string;
  content: string;
}

export interface Service {
  title: string;
  description: string;
  formats: string[];
  pricing?: string;
}
