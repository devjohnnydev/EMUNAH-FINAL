import Layout from "@/components/layout";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";

export default function Shop() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-primary mb-2 text-center">Nossa Loja</h1>
        <p className="text-center text-muted-foreground mb-12">Todas as peças disponíveis para você.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
