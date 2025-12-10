import Layout from "@/components/layout";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useViaCep } from "@/hooks/use-viacep";
import { useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Search } from "lucide-react";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchAddress, isLoading: isCepLoading, error: cepError } = useViaCep();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
  const shipping = 25.00;
  const total = subtotal + shipping;

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    setFormData(prev => ({ ...prev, cep: value }));
  };

  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      const address = await fetchAddress(cleanCep);
      if (address) {
        setFormData(prev => ({
          ...prev,
          street: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.stateCode,
        }));
        toast({
          title: "Endereço encontrado!",
          description: `${address.street}, ${address.city} - ${address.stateCode}`,
        });
      }
    }
  };

  const handleSearchCep = async () => {
    await handleCepBlur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Obrigado por comprar na EMUNAH. Você receberá um email com os detalhes.",
      });
      setLocation("/");
    }, 2000);
  };

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-3xl font-bold text-primary mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input 
                        id="firstName" 
                        required 
                        placeholder="Seu nome"
                        value={formData.firstName}
                        onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        data-testid="input-firstName"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input 
                        id="lastName" 
                        required 
                        placeholder="Seu sobrenome"
                        value={formData.lastName}
                        onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        data-testid="input-lastName"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input 
                      id="phone" 
                      required 
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      data-testid="input-phone"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="cep" 
                        required 
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={handleCepChange}
                        onBlur={handleCepBlur}
                        maxLength={9}
                        data-testid="input-cep"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={handleSearchCep}
                        disabled={isCepLoading}
                        data-testid="button-search-cep"
                      >
                        {isCepLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {cepError && (
                      <p className="text-xs text-destructive">{cepError}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Digite o CEP para preencher automaticamente
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input 
                        id="street" 
                        required
                        value={formData.street}
                        onChange={e => setFormData(prev => ({ ...prev, street: e.target.value }))}
                        data-testid="input-street"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input 
                        id="number" 
                        required
                        value={formData.number}
                        onChange={e => setFormData(prev => ({ ...prev, number: e.target.value }))}
                        data-testid="input-number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input 
                        id="complement"
                        placeholder="Apto, Bloco, etc."
                        value={formData.complement}
                        onChange={e => setFormData(prev => ({ ...prev, complement: e.target.value }))}
                        data-testid="input-complement"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input 
                        id="neighborhood" 
                        required
                        value={formData.neighborhood}
                        onChange={e => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                        data-testid="input-neighborhood"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input 
                        id="city" 
                        required
                        value={formData.city}
                        onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        data-testid="input-city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input 
                        id="state" 
                        required
                        placeholder="UF"
                        maxLength={2}
                        value={formData.state}
                        onChange={e => setFormData(prev => ({ ...prev, state: e.target.value.toUpperCase() }))}
                        data-testid="input-state"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading} data-testid="button-submit-order">
                {isLoading ? "Processando..." : `Pagar ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`}
              </Button>
            </form>
          </div>

          <div>
            <Card className="bg-secondary/10 border-none">
              <CardHeader>
                <CardTitle>Seu Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm" data-testid={`item-${item.id}`}>
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded bg-white overflow-hidden">
                           <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                         </div>
                         <div>
                           <p className="font-medium">{item.name}</p>
                           <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                         </div>
                      </div>
                      <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(item.price) * item.quantity)}</span>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span data-testid="text-subtotal">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span data-testid="text-shipping">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shipping)}</span>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span data-testid="text-total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
