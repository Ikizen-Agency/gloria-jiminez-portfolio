import Link from "next/link";
import { Newspaper } from "lucide-react";

export function Footer() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articulos", label: "Artículos" },
    { href: "/servicios", label: "Servicios" },
    { href: "/politica-de-privacidad", label: "Política de Privacidad" },
    { href: "/aviso-legal", label: "Aviso Legal" },
  ];

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-bold">
                Gloria Yolanda Jimenez
              </span>
            </Link>
            <p className="max-w-xs text-sm text-foreground/60">
              Periodismo con rigor y profundidad. Explorando las historias que definen nuestro mundo.
            </p>
          </div>
          
          <nav className="grid grid-cols-2 gap-4 text-center md:gap-8 lg:text-left">
              <div>
                  <h3 className="font-semibold text-foreground">Navegación</h3>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/60">
                      {navLinks.slice(0,3).map(link => (
                          <li key={link.href}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
                      ))}
                  </ul>
              </div>
              <div>
                  <h3 className="font-semibold text-foreground">Legal</h3>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/60">
                      {navLinks.slice(3,5).map(link => (
                          <li key={link.href}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
                      ))}
                  </ul>
              </div>
          </nav>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} Gloria Yolanda Jimenez. Todos los derechos reservados.
          </p>
          <p className="mt-1">
            Hecho por{" "}
            <a
              href="https://ikizen.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary/80 hover:text-primary hover:underline"
            >
              ikizen
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
