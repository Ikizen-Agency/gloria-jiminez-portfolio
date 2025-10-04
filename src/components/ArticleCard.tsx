import Link from 'next/link';
import Image from 'next/image';
import { type Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  view: 'grid' | 'list';
}

export function ArticleCard({ article, view }: ArticleCardProps) {
  if (view === 'list') {
    return (
      <Link href={`/articulos/${article.slug}`} className="group block">
        <Card className="flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:border-primary/50">
          <div className="relative h-48 w-full md:h-auto md:w-1/3 flex-shrink-0">
            <Image
              src={article.heroImageUrl}
              alt={article.title}
              fill
              className="object-cover"
              data-ai-hint={article.heroImageHint}
            />
          </div>
          <div className="flex flex-1 flex-col p-4 sm:p-6">
            <CardTitle className="mb-2 font-headline text-2xl leading-tight group-hover:text-primary transition-colors">
              {article.title}
            </CardTitle>
            <p className="flex-grow text-base text-foreground/70 mb-4">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/60 mt-auto">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link href={`/articulos/${article.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.heroImageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={article.heroImageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <CardTitle className="mb-2 font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          <p className="flex-grow text-sm text-foreground/70">
            {article.excerpt}
          </p>
        </CardContent>
        <CardFooter className="flex-wrap items-center justify-between gap-2 p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-foreground/60">{article.date}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
