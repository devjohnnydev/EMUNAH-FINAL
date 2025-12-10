import { Link } from "wouter";
import { Product } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden border-none shadow-none bg-transparent hover:bg-transparent">
      <CardContent className="p-0">
        <Link 
          href={`/product/${product.slug}`}
          className="block overflow-hidden rounded-lg bg-secondary/20 aspect-[4/5] relative"
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <Link 
          href={`/product/${product.slug}`}
          className="font-serif font-medium text-lg text-primary hover:underline decoration-primary/30 underline-offset-4"
        >
          {product.name}
        </Link>
        <p className="text-sm font-semibold text-foreground/80 mt-1">
          {formatPrice(product.price)}
        </p>
      </CardFooter>
    </Card>
  );
}
