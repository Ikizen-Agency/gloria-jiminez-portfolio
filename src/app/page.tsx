import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/data/articles';
import { services } from '@/data/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/ArticleCard';
import { ArrowRight, CheckCircle, Newspaper, MessageCircle } from 'lucide-react';

export default function Home() {
  const latestArticles = articles.slice(0, 3);
  const heroImage = PlaceHolderImages.find(p => p.id === 'andalucia-hero');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center text-center text-white">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Paisaje de Andalucía"
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            Gloria Yolanda Jimenez
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Periodismo de investigación, análisis y crónicas que dan voz a las historias que importan.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/articulos">
              <Button size="lg">
                Leer Artículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* Asegúrate de reemplazar 1234567890 con tu número de teléfono real de WhatsApp, incluyendo el código de país. */}
            <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                    Contactar por WhatsApp
                    <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Sobre Mí
          </h2>
          <p className="mt-6 text-lg text-foreground/70">
            Con más de una década de experiencia, me dedico a descubrir y contar la verdad. Mi trabajo se centra en la justicia social, la política y la cultura, buscando siempre el ángulo humano detrás de cada noticia.
          </p>
        </div>
      </section>

      {/* Main Articles Section */}
      <section id="articles" className="bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Artículos Destacados
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
              Una selección de mis trabajos más recientes y relevantes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} view="grid" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/articulos">
              <Button variant="outline" size="lg">
                Ver Todos los Artículos
                <Newspaper className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Servicios Profesionales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            Ofrezco mi experiencia en comunicación para potenciar tus proyectos.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {services.slice(0, 2).map((service) => (
            <div key={service.title} className="rounded-lg border bg-card p-6">
              <h3 className="font-headline text-xl font-bold">{service.title}</h3>
              <p className="mt-4 text-foreground/70">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.formats.map((format) => (
                  <li key={format} className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    {format}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/servicios">
            <Button size="lg">
              Conocer más servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
