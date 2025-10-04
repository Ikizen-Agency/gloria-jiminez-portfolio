import Link from 'next/link';
import { services } from '@/data/services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-5xl font-bold">Servicios</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
          Mi experiencia como periodista al servicio de tus necesidades de comunicación y contenido.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="flex-grow">
                <h4 className="mb-2 font-semibold">Formatos:</h4>
                <ul className="space-y-2">
                  {service.formats.map((format) => (
                    <li key={format} className="flex items-start text-sm">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{format}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {service.pricing && (
                <p className="mt-6 text-xs text-muted-foreground">{service.pricing}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="font-headline text-2xl font-bold">¿Tienes un proyecto en mente?</h3>
        <p className="mx-auto mt-2 max-w-xl text-foreground/70">
          Contacta conmigo para hablar sobre cómo podemos colaborar y te prepararé una propuesta a medida sin compromiso.
        </p>
        <Link href="/contacto" className="mt-6 inline-block">
          <Button size="lg">
            Hablemos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
