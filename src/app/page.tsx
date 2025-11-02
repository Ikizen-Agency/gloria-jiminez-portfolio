"use client";

import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data/articles";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ArticleCard";
import {
  ArrowRight,
  CheckCircle,
  Newspaper,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
  const latestArticles = articles.slice(0, 3);
  const aboutRef = useRef<HTMLElement>(null);
  const articlesRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in-view");
          // Animar las tarjetas dentro de la sección
          const cards = entry.target.querySelectorAll(".animate-card-in");
          cards.forEach((card) => {
            (card as HTMLElement).style.animationPlayState = "running";
          });
        }
      });
    }, observerOptions);

    const refs = [aboutRef, articlesRef, servicesRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center text-center text-white">
        <Image
          src="/images/andalucia-hero.png"
          alt="Paisaje de Andalucía"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8">
          <Image
            src="/images/gloria-yolanda.png"
            alt="foto de Gloria Yolanda Diaz Jimenez"
            width={200}
            height={200}
            className="rounded-full bg-red-900 animate-fade-in-scale"
          />
          <h1 className="font-headline text-5xl font-bold md:text-7xl animate-fade-in-up">
            Gloria Yolanda Díaz Jiménez
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80 animate-fade-in-delay">
            Periodismo de investigación, análisis y crónicas que dan voz a las
            historias que importan.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-buttons">
            <Link href="/articulos">
              <Button size="lg">
                Leer Artículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://wa.me/58139044"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black"
              >
                Contactar por WhatsApp
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="container mx-auto py-16 md:py-24 px-4 animate-on-scroll"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Sobre Mí
          </h2>
          <p className="mt-6 text-lg text-foreground/70">
            Con más de una década de experiencia, me dedico a descubrir y contar
            la verdad. Mi trabajo se centra en la justicia social, la política y
            la cultura, buscando siempre el ángulo humano detrás de cada
            noticia.
          </p>
        </div>
      </section>

      {/* Main Articles Section */}
      <section
        ref={articlesRef}
        id="articles"
        className="bg-card/50 py-16 md:py-24 animate-on-scroll"
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Artículos Destacados
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
              Una selección de mis trabajos más recientes y relevantes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article, index) => (
              <div
                key={article.slug}
                className="animate-card-in"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationPlayState: "paused",
                }}
              >
                <ArticleCard article={article} view="grid" />
              </div>
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
      <section
        ref={servicesRef}
        id="services"
        className="container mx-auto py-16 md:py-24 px-4 animate-on-scroll"
      >
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Servicios Profesionales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            Ofrezco mi experiencia en comunicación para potenciar tus proyectos.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {services.slice(0, 2).map((service, index) => (
            <div
              key={service.title}
              className="rounded-lg border bg-card p-6 animate-card-in"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationPlayState: "paused",
              }}
            >
              <h3 className="font-headline text-xl font-bold">
                {service.title}
              </h3>
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
