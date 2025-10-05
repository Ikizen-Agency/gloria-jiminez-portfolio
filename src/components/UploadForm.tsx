"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateAndEditArticleSummary } from "@/ai/flows/generate-and-edit-article-summary";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  articleContent: z.string().min(1, "El contenido del artículo es requerido."),
  excerpt: z.string().min(1, "El extracto es requerido."),
  tags: z.string().min(1, "Añade al menos una etiqueta."),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export function UploadForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      articleContent: "",
      excerpt: "",
      tags: "",
    },
  });

  const handleGenerateSummary = async () => {
    const articleContent = form.getValues("articleContent");
    if (!articleContent) {
      toast({
        title: "Contenido vacío",
        description: "Por favor, escribe o pega el contenido del artículo primero.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAndEditArticleSummary({ articleContent });
      form.setValue("excerpt", result.summary, { shouldValidate: true });
      toast({
        title: "Resumen generado",
        description: "El resumen ha sido creado y añadido al campo de extracto.",
      });
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error de generación",
        description: "No se pudo generar el resumen. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: ArticleFormValues) => {
    setIsPublishing(true);
    console.log("Publishing article with data:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Artículo Publicado",
      description: `El artículo "${data.title}" ha sido publicado con éxito.`,
    });
    form.reset();
    setIsPublishing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
            <CardContent className="space-y-6 pt-6">
                 <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Artículo</FormLabel>
                      <FormControl>
                        <Input placeholder="El titular principal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                    control={form.control}
                    name="articleContent"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contenido del artículo (MDX/HTML)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Pega aquí el contenido de tu artículo..."
                            rows={15}
                            className="font-mono"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex items-center justify-between">
                         <FormLabel>Extracto / Resumen</FormLabel>
                       </div>
                      <FormControl>
                        <Textarea placeholder="Un resumen corto y atractivo para la vista previa..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etiquetas</FormLabel>
                      <FormControl>
                        <Input placeholder="política, cultura, internacional" {...field} />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">Separadas por comas.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full" disabled={isPublishing}>
                {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publicar Artículo
                </Button>
            </CardContent>
        </Card>
      </form>
    </Form>
  );
}
