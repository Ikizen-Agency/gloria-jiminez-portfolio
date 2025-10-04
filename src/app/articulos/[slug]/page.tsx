import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag, Download, Share2, Twitter, Linkedin, Copy } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: `${article.title} | Gloria Yolanda Jimenez`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `/articulos/${params.slug}`,
      images: [
        {
          url: article.heroImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.heroImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      {/* Article Header */}
      <header className="relative h-[50vh] min-h-[300px] w-full">
        <Image
          src={article.heroImageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={article.heroImageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col items-start justify-end pb-12">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-opacity-80 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 font-headline text-4xl font-bold text-white md:text-6xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="container py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-3 lg:order-last">
            <div className="sticky top-24 space-y-4">
              <h3 className="font-semibold">Compartir</h3>
              <div className="flex flex-col space-y-2">
                 <Button variant="outline" className="justify-start"><Twitter className="mr-2 h-4 w-4" /> Twitter</Button>
                 <Button variant="outline" className="justify-start"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
                 <Button variant="outline" className="justify-start"><Copy className="mr-2 h-4 w-4" /> Copiar enlace</Button>
              </div>
              <h3 className="pt-4 font-semibold">Descargar</h3>
              <Button variant="secondary" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
            </div>
          </aside>

          <div className="prose prose-invert max-w-none lg:col-span-9 prose-headings:font-headline prose-p:text-foreground/80 prose-a:text-primary prose-blockquote:border-primary prose-strong:text-foreground">
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>
    </article>
  );
}
