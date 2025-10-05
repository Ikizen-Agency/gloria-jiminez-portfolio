"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Newspaper, X } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articulos", label: "Artículos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
    )}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold sm:inline-block">
              Gloria Yolanda Jimenez
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                         <Link href="/" className="flex items-center space-x-2">
                            <Newspaper className="h-6 w-6 text-primary" />
                            <span className="font-headline text-lg font-bold">GYJ</span>
                        </Link>
                        <SheetClose asChild>
                            <Button variant="ghost" className="h-auto p-1 text-foreground/70"><X className="h-5 w-5"/></Button>
                        </SheetClose>
                    </div>

                    <div className="mt-12 flex flex-col gap-4 text-xl">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary" : "text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    </div>
                    <div className="mt-auto">
                        <SheetClose asChild>
                            <Link href="/admin" className="w-full">
                                <Button variant="outline" className="w-full">
                                Admin Panel
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>
                </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
