import Layout from "@/components/layout";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroBg from '@assets/generated_images/t-shirt_mockup_with_logo.png';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-secondary/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={heroBg} alt="Background" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm text-xs font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Nova Coleção 2025
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Fé que se veste.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            EMUNHAH traz roupas e acessórios minimalistas que expressam sua fé com elegância e propósito.
          </p>
          <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-8 text-lg h-12">
                Ver Loja <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Destaques</h2>
              <p className="text-muted-foreground">Os favoritos da nossa comunidade.</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Ver todos
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-serif text-4xl font-bold text-primary mb-6">Nossa Missão</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            "EMUNHAH" significa fé, firmeza e verdade. Acreditamos que o que vestimos pode ser uma expressão silenciosa, porém poderosa, de quem somos e no que cremos. Cada peça é criada para lembrar você do seu propósito.
          </p>
        </div>
      </section>
    </Layout>
  );
}
