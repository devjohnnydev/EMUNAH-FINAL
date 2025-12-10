import Layout from "@/components/layout";
import { getProductBySlug } from "@/lib/data";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { formatPrice } from "@/lib/utils";

export default function ProductPage() {
  const [match, params] = useRoute("/product/:slug");
  const product = match && params?.slug ? getProductBySlug(params.slug) : null;
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link href="/shop">
            <Button>Voltar para Loja</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Loja
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image */}
          <div className="aspect-[4/5] bg-secondary/10 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold mb-8">
              {formatPrice(product.price)}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 text-lg h-14 rounded-full" onClick={handleAddToCart}>
                Adicionar ao Carrinho
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t text-sm text-muted-foreground space-y-2">
              <p>✓ Entrega para todo o Brasil</p>
              <p>✓ Compra segura</p>
              <p>✓ Qualidade garantida</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
