import { UploadForm } from "@/components/UploadForm";

export default function UploadArticlePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold">Crear Artículo</h1>
            <p className="mt-2 text-lg text-muted-foreground">
            Rellena los campos para crear una nueva publicación.
            </p>
        </div>
        <UploadForm />
      </div>
    </div>
  );
}
