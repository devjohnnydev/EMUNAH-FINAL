import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Printer, Save, Send, RefreshCw, QrCode, ShoppingBag, Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';
import qrCodeImg from '@assets/generated_images/qr_code_for_pix_payment.png';
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const bibleVerses = [
  "Tudo posso naquele que me fortalece. - Filipenses 4:13",
  "O Senhor é o meu pastor, nada me faltará. - Salmos 23:1",
  "Entrega o teu caminho ao Senhor; confia nele, e ele o fará. - Salmos 37:5",
  "Porque para Deus nada é impossível. - Lucas 1:37",
  "Alegrai-vos sempre no Senhor. - Filipenses 4:4",
  "O amor jamais acaba. - 1 Coríntios 13:8"
];

interface QuoteItem {
  id: number;
  productId?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

function ProductSelector({ onSelect }: { onSelect: (product: Product) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = products?.filter(p => 
    p.active && (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const handleSelectProduct = (product: Product) => {
    onSelect(product);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-add-product" className="gap-2">
          <Plus className="h-4 w-4" /> Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Selecionar Produto do Catálogo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              data-testid="input-search-product"
              placeholder="Buscar produto por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-y-auto max-h-96 space-y-2">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Carregando produtos...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhum produto encontrado</p>
            ) : (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  data-testid={`button-select-product-${product.id}`}
                  onClick={() => handleSelectProduct(product)}
                  className="w-full flex items-center gap-4 p-3 rounded-lg border hover-elevate active-elevate-2 text-left"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-16 w-16 rounded object-cover bg-secondary/20"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{formatPrice(product.price)}</p>
                    <p className="text-xs text-muted-foreground">Estoque: {product.stock}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function NewQuote() {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [randomVerse, setRandomVerse] = useState(bibleVerses[0]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const addProductToQuote = (product: Product) => {
    const existingItem = items.find(i => i.productId === product.id);
    
    if (existingItem) {
      setItems(items.map(item => 
        item.id === existingItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast({
        title: "Quantidade atualizada",
        description: `${product.name} agora tem ${existingItem.quantity + 1} unidades.`,
      });
    } else {
      const newItem: QuoteItem = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: parseFloat(product.price),
      };
      setItems([...items, newItem]);
      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado à cotação.`,
      });
    }
  };

  const addCustomItem = () => {
    setItems([...items, { 
      id: Date.now(), 
      productName: "", 
      quantity: 1, 
      unitPrice: 0 
    }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const total = subtotal + shippingCost;

  const handleGenerateVerse = () => {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    setRandomVerse(bibleVerses[randomIndex]);
  };

  const handleSave = () => {
    if (!clientName) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha o nome do cliente.",
        variant: "destructive"
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Adicione pelo menos um produto à cotação.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Cotação Salva!",
      description: `Orçamento para ${clientName} foi salvo com sucesso.`,
    });
    setIsPreviewMode(true);
  };

  const handleWhatsApp = () => {
    if (!clientPhone) {
      toast({
        title: "Telefone não informado",
        description: "Preencha o telefone para enviar via WhatsApp.",
        variant: "destructive"
      });
      return;
    }

    const itemsList = items.map(i => `- ${i.quantity}x ${i.productName}: ${formatPrice(i.unitPrice * i.quantity)}`).join('%0A');
    const shippingText = shippingCost > 0 ? `%0AFrete: ${formatPrice(shippingCost)}%0A` : '';
    const message = `*Olá, ${clientName}!*%0A%0AAqui está seu orçamento da EMUNAH:%0A%0A${itemsList}${shippingText}%0A*Total: ${formatPrice(total)}*%0A%0APagamento via PIX.%0A"${randomVerse}"`;
    
    window.open(`https://wa.me/55${clientPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleCreateOrder = () => {
    toast({
      title: "Pedido Gerado!",
      description: `O orçamento #${Math.floor(Math.random() * 10000)} foi convertido em pedido.`,
    });
    setLocation("/admin/orders");
  };

  if (isPreviewMode) {
    return (
      <AdminLayout title="Visualizar Orçamento">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-between gap-4 mb-6 print:hidden">
            <Button variant="outline" onClick={() => setIsPreviewMode(false)} data-testid="button-back-to-edit">
              Voltar para Edição
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => window.print()} variant="outline" className="gap-2" data-testid="button-print">
                <Printer className="h-4 w-4" /> Imprimir
              </Button>
              <Button onClick={handleWhatsApp} className="gap-2 bg-green-600 hover:bg-green-700 text-white" data-testid="button-send-whatsapp">
                <Send className="h-4 w-4" /> Enviar WhatsApp
              </Button>
              <Button onClick={handleCreateOrder} className="gap-2" data-testid="button-create-order">
                <ShoppingBag className="h-4 w-4" /> Gerar Pedido
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border" id="print-area">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8 border-b pb-6">
              <div className="flex items-center gap-4">
                <img src={logoImg} alt="Logo" className="h-16 w-16 object-contain" />
                <div>
                  <h1 className="text-2xl font-serif font-bold text-primary">EMUNAH</h1>
                  <p className="text-sm text-muted-foreground">CNPJ: 00.000.000/0001-00</p>
                  <p className="text-sm text-muted-foreground">(11) 99999-9999 | contato@emunah.com</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-800">ORÇAMENTO</h2>
                <p className="text-sm text-gray-500">#{Math.floor(Math.random() * 10000)}</p>
                <p className="text-sm text-gray-500">Data: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-8 bg-secondary/10 p-4 rounded-md">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Cliente</h3>
              <p className="font-bold text-lg" data-testid="text-client-name">{clientName || "Cliente Não Identificado"}</p>
              <p className="text-gray-600">{clientPhone || "Telefone não informado"}</p>
            </div>

            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="text-left py-2 font-bold text-gray-700">Descrição</th>
                  <th className="text-center py-2 font-bold text-gray-700 w-24">Qtd</th>
                  <th className="text-right py-2 font-bold text-gray-700 w-32">Unitário</th>
                  <th className="text-right py-2 font-bold text-gray-700 w-32">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{item.productName || "Produto sem descrição"}</td>
                    <td className="py-3 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-700">{formatPrice(item.unitPrice)}</td>
                    <td className="py-3 text-right font-medium text-gray-900">{formatPrice(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
                {shippingCost > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">Frete</td>
                    <td className="py-3 text-center text-gray-700">-</td>
                    <td className="py-3 text-right text-gray-700">-</td>
                    <td className="py-3 text-right font-medium text-gray-900">{formatPrice(shippingCost)}</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-right font-bold text-gray-600">Total Geral:</td>
                  <td className="pt-4 text-right font-bold text-xl text-primary" data-testid="text-total-price">{formatPrice(total)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <QrCode className="h-4 w-4" /> Pagamento via PIX
                </h3>
                <div className="flex gap-4 items-start">
                  <div className="h-24 w-24 bg-gray-100 rounded border p-1">
                     <img src={qrCodeImg} className="w-full h-full object-contain mix-blend-multiply" alt="QR Code PIX" />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Chave: <strong>pix@emunah.com</strong></p>
                    <p>Banco: Nubank</p>
                    <p>Titular: Emunah Confecções</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col justify-end">
                <p className="text-sm text-muted-foreground italic mb-2">"{randomVerse}"</p>
                <div className="h-1 w-full bg-primary/20 rounded-full"></div>
              </div>
            </div>
            
            <div className="mt-12 text-center text-xs text-gray-400">
              Este orçamento é válido por 15 dias. Sujeito a disponibilidade de estoque.
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Nova Cotação">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Cliente / Igreja</Label>
                    <Input 
                      data-testid="input-client-name"
                      placeholder="Ex: Igreja Batista..." 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp / Telefone</Label>
                    <Input 
                      data-testid="input-client-phone"
                      placeholder="(00) 00000-0000" 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
                <CardTitle>Itens do Pedido</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <ProductSelector onSelect={addProductToQuote} />
                  <Button size="sm" variant="outline" onClick={addCustomItem} className="gap-2" data-testid="button-add-custom">
                    <Plus className="h-4 w-4" /> Item Personalizado
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhum produto adicionado ainda</p>
                    <p className="text-sm">Clique em "Adicionar Produto" para começar</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex flex-wrap gap-4 items-start p-4 border rounded-lg bg-secondary/5 relative group">
                      <div className="flex-1 min-w-[200px] space-y-2">
                        <Label className="text-xs text-muted-foreground">Descrição do Produto</Label>
                        <Input 
                          data-testid={`input-product-name-${item.id}`}
                          placeholder="Ex: Camiseta Algodão Premium - Tam M" 
                          value={item.productName}
                          onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <Label className="text-xs text-muted-foreground">Qtd</Label>
                        <Input 
                          data-testid={`input-quantity-${item.id}`}
                          type="number" 
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="w-32 space-y-2">
                        <Label className="text-xs text-muted-foreground">Valor Unit. (R$)</Label>
                        <Input 
                          data-testid={`input-unit-price-${item.id}`}
                          type="number" 
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="w-32 space-y-2 text-right">
                        <Label className="text-xs text-muted-foreground">Total</Label>
                        <div className="h-10 flex items-center justify-end font-bold text-primary">
                          {formatPrice(item.quantity * item.unitPrice)}
                        </div>
                      </div>
                      
                      <Button 
                        data-testid={`button-remove-item-${item.id}`}
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardHeader>
                <CardTitle>Resumo do Orçamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm opacity-80">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm opacity-80">
                  <span>Frete</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <Separator className="bg-primary-foreground/20" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span data-testid="text-total">{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frete (R$)</Label>
                  <Input 
                    data-testid="input-shipping"
                    type="number" 
                    min="0"
                    step="0.01"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Versículo do Rodapé</Label>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={handleGenerateVerse} data-testid="button-change-verse">
                      <RefreshCw className="h-3 w-3 mr-1" /> Trocar
                    </Button>
                  </div>
                  <Textarea 
                    value={randomVerse} 
                    readOnly 
                    className="min-h-[80px] text-sm italic bg-muted"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button variant="outline" className="w-full" onClick={() => setIsPreviewMode(true)} data-testid="button-preview">
                    Visualizar
                  </Button>
                  <Button className="w-full" onClick={handleSave} data-testid="button-save">
                    <Save className="h-4 w-4 mr-2" /> Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
