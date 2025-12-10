import Layout from "@/components/layout";
import ProductCard from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function Shop() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const activeProducts = products.filter(p => p.active);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-primary mb-2 text-center">Nossa Loja</h1>
        <p className="text-center text-muted-foreground mb-12">Todas as peças disponíveis para você.</p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {activeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
