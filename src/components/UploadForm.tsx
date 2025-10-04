"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateAndEditArticleSummary } from "@/ai/flows/generate-and-edit-article-summary";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Loader2, UploadCloud } from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  docxFile: z.any().optional(), // In a real app, use a more specific validator
  articleContent: z.string().min(1, "El contenido del artículo es requerido."),
  excerpt: z.string().min(1, "El extracto es requerido."),
  tags: z.string().min(1, "Añade al menos una etiqueta."),
  featuredImage: z.any().optional(),
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Contenido del Artículo</CardTitle>
                <CardDescription>
                  Sube un archivo .docx o pega el contenido directamente.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="docxFile">Subir .docx</Label>
                  <div className="flex items-center gap-2">
                    <Input id="docxFile" type="file" accept=".docx" {...form.register("docxFile")} />
                    <Button type="button" variant="secondary">Procesar</Button>
                  </div>
                   <p className="text-xs text-muted-foreground">La conversión de .docx a HTML/MDX es simulada.</p>
                </div>

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
              </CardContent>
            </Card>
          </div>

          {/* Metadata Column */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Metadatos</CardTitle>
                <CardDescription>
                  Información clave para la organización y SEO.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex items-center justify-between">
                         <FormLabel>Extracto / Resumen</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleGenerateSummary}
                            disabled={isGenerating}
                            className="text-xs text-primary h-auto p-1"
                          >
                            {isGenerating ? (
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            ) : (
                              <Sparkles className="mr-1 h-3 w-3" />
                            )}
                            Generar AI
                          </Button>
                       </div>
                      <FormControl>
                        <Textarea placeholder="Un resumen corto y atractivo..." {...field} />
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

                <FormItem>
                  <FormLabel>Imagen Destacada</FormLabel>
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="featuredImage" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click para subir</span></p>
                          </div>
                          <Input id="featuredImage" type="file" className="hidden" {...form.register("featuredImage")} />
                      </label>
                  </div> 
                </FormItem>

              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isPublishing}>
              {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publicar Artículo
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
