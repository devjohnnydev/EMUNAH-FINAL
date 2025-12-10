import Layout from "@/components/layout";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trash2, Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 25.00; // Fixed shipping for mock
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-6">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8">Parece que você ainda não escolheu seus produtos.</p>
          <Link href="/shop">
            <Button size="lg">Começar a comprar</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-bold text-primary mb-10">Carrinho de Compras</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-4 rounded-lg border bg-card">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-secondary/10">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium">
                      <h3 className="font-serif text-primary">
                        <Link href={`/product/${item.slug}`} className="hover:underline">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="ml-4">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-2 border rounded-md p-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-medium text-primary mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete (Fixo)</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-base font-medium text-primary">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mt-8" size="lg">
                  Finalizar Compra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
