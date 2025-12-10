import { Link, useLocation } from "wouter";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';
import { ShoppingCart, Menu, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Loja" },
    { href: "/about", label: "Sobre" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`text-lg font-medium ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <Link href="/admin/login" className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary">
                  <Lock className="h-4 w-4" />
                  Área Restrita
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src={logoImg} alt="EMUNHAH Logo" className="h-8 w-8 object-contain" />
            <span className="font-serif font-bold text-xl tracking-tight text-primary">EMUNHAH</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart Icon & Admin Link */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground rounded-full">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-muted py-12 border-t mt-auto">
        <div className="container mx-auto px-4 text-center">
          <img src={logoImg} alt="EMUNHAH Logo" className="h-12 w-12 object-contain mx-auto mb-6 opacity-80" />
          <h3 className="font-serif text-2xl font-bold text-primary mb-2">EMUNHAH</h3>
          <p className="text-muted-foreground mb-8 italic">"Vista-se com propósito."</p>
          
          <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
            <Link href="/shop" className="hover:text-primary transition-colors">Loja</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Sobre Nós</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contato</Link>
          </div>

          <div className="flex justify-center mb-6">
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="gap-2 text-xs opacity-70 hover:opacity-100">
                <Lock className="h-3 w-3" />
                Acesso Sistema
              </Button>
            </Link>
          </div>
          
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} EMUNHAH. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
