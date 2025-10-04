"use client";

import { useState, useMemo } from 'react';
import { articles as allArticles } from '@/data/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allArticles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags)];
  }, []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-5xl font-bold">Artículos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
          Explora el archivo completo de investigaciones, crónicas y análisis.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título o palabra clave..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por etiqueta" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>
                  {tag === 'all' ? 'Todas las etiquetas' : tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="hidden sm:flex items-center gap-1 rounded-md bg-card p-1">
            <Button variant={view === 'grid' ? "secondary" : "ghost"} size="icon" onClick={() => setView('grid')} aria-label="Grid View">
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant={view === 'list' ? "secondary" : "ghost"} size="icon" onClick={() => setView('list')} aria-label="List View">
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Articles Grid/List */}
      {filteredArticles.length > 0 ? (
        <div className={cn(
          "grid gap-8",
          view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredArticles.map(article => (
            <ArticleCard key={article.slug} article={article} view={view} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">No se encontraron artículos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}
