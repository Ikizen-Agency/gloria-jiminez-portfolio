"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  email: z.string().email("El correo electrónico no es válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Sending message:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: "Mensaje Enviado",
      description: "Gracias por contactarme. Te responderé lo antes posible.",
    });
    form.reset();
  };

  const socialLinks = [
    { name: "Email", href: "mailto:contacto@gloriayolanda.com", icon: Mail, user: "contacto@gloriayolanda.com" },
    { name: "Twitter", href: "#", icon: Twitter, user: "@gloriayolanda" },
    { name: "LinkedIn", href: "#", icon: Linkedin, user: "Gloria Yolanda Jimenez" },
  ];

  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-5xl font-bold">Contacto</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
          ¿Tienes una historia, una propuesta o simplemente quieres saludar? Estaré encantada de escucharte.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-headline text-3xl font-bold">Enviar un Mensaje</h2>
          <Card className="mt-6 border-0 bg-transparent shadow-none">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl><Input type="email" placeholder="tu@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl><Textarea placeholder="Escribe aquí tu mensaje..." rows={6} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar Mensaje
                </Button>
              </form>
            </Form>
          </Card>
        </div>

        <div>
           <h2 className="font-headline text-3xl font-bold">Otras Vías de Contacto</h2>
           <div className="mt-6 space-y-6">
             {socialLinks.map(link => (
                <Link href={link.href} key={link.name} target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="p-4 transition-colors hover:bg-accent/50 hover:border-primary/30">
                        <div className="flex items-center gap-4">
                            <link.icon className="h-8 w-8 text-primary" />
                            <div>
                                <h3 className="font-semibold text-lg">{link.name}</h3>
                                <p className="text-muted-foreground">{link.user}</p>
                            </div>
                        </div>
                    </Card>
                </Link>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
