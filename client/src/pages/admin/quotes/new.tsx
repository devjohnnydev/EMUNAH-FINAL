import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Printer, Save, Send, RefreshCw, QrCode } from "lucide-react";
import { useState, useRef } from "react";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';
import qrCodeImg from '@assets/generated_images/qr_code_for_pix_payment.png';
import { formatPrice } from "@/lib/utils";

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
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewQuote() {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [items, setItems] = useState<QuoteItem[]>([
    { id: 1, description: "", quantity: 1, unitPrice: 0 }
  ]);
  const [randomVerse, setRandomVerse] = useState(bibleVerses[0]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", quantity: 1, unitPrice: 0 }]);
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
  const total = subtotal; // Can add discount logic later

  const handleGenerateVerse = () => {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    setRandomVerse(bibleVerses[randomIndex]);
  };

  if (isPreviewMode) {
    return (
      <AdminLayout title="Visualizar Orçamento">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-6 print:hidden">
            <Button variant="outline" onClick={() => setIsPreviewMode(false)}>Voltar para Edição</Button>
            <div className="flex gap-2">
              <Button onClick={() => window.print()} className="gap-2">
                <Printer className="h-4 w-4" /> Imprimir / PDF
              </Button>
              <Button className="gap-2" variant="secondary">
                <Send className="h-4 w-4" /> Enviar WhatsApp
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border" id="print-area">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b pb-6">
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

            {/* Client Info */}
            <div className="mb-8 bg-secondary/10 p-4 rounded-md">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Cliente</h3>
              <p className="font-bold text-lg">{clientName || "Cliente Não Identificado"}</p>
              <p className="text-gray-600">{clientPhone || "Telefone não informado"}</p>
            </div>

            {/* Items Table */}
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
                    <td className="py-3 text-gray-700">{item.description || "Produto sem descrição"}</td>
                    <td className="py-3 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-700">{formatPrice(item.unitPrice)}</td>
                    <td className="py-3 text-right font-medium text-gray-900">{formatPrice(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-right font-bold text-gray-600">Total Geral:</td>
                  <td className="pt-4 text-right font-bold text-xl text-primary">{formatPrice(total)}</td>
                </tr>
              </tfoot>
            </table>

            {/* Payment & Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <QrCode className="h-4 w-4" /> Pagamento via PIX
                </h3>
                <div className="flex gap-4 items-start">
                  <div className="h-24 w-24 bg-gray-100 rounded border p-1">
                     <img src={qrCodeImg} className="w-full h-full object-contain mix-blend-multiply" />
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
          
          {/* Main Form */}
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
                      placeholder="Ex: Igreja Batista..." 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp / Telefone</Label>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Itens do Pedido</CardTitle>
                <Button size="sm" onClick={addItem} className="gap-2">
                  <Plus className="h-4 w-4" /> Adicionar Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-start p-4 border rounded-lg bg-secondary/5 relative group">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs text-muted-foreground">Descrição do Produto</Label>
                      <Input 
                        placeholder="Ex: Camiseta Algodão Premium - Tam M" 
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label className="text-xs text-muted-foreground">Qtd</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs text-muted-foreground">Valor Unit. (R$)</Label>
                      <Input 
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
                    
                    {items.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Summary */}
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
                <Separator className="bg-primary-foreground/20" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações Finais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Versículo do Rodapé</Label>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={handleGenerateVerse}>
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
                  <Button variant="outline" className="w-full" onClick={() => setIsPreviewMode(true)}>
                    Visualizar
                  </Button>
                  <Button className="w-full">
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
