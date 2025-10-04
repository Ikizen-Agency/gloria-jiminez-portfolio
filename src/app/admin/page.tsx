import { UploadForm } from "@/components/UploadForm";

export default function AdminPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Panel de Administración</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sube, edita y publica tus artículos desde aquí.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}
