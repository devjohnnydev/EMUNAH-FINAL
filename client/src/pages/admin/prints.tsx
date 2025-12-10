import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialPrints = [
  { id: 1, name: "Leão de Judá", url: logoImg },
  { id: 2, name: "Cruz Minimalista", url: logoImg },
  { id: 3, name: "Versículo João 3:16", url: logoImg },
  { id: 4, name: "Fé e Graça", url: logoImg },
  { id: 5, name: "Emunah Logo Full", url: logoImg },
  { id: 6, name: "Espirito Santo", url: logoImg },
];

export default function AdminPrints() {
  const [prints, setPrints] = useState(initialPrints);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const [newPrint, setNewPrint] = useState({ name: "", url: "" });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload by using the logo if no URL provided, or the URL provided
    const urlToUse = newPrint.url || logoImg;
    
    setPrints([...prints, { id: Date.now(), name: newPrint.name, url: urlToUse }]);
    setOpen(false);
    setNewPrint({ name: "", url: "" });
    toast({
      title: "Estampa adicionada",
      description: "A nova arte foi salva na galeria."
    });
  };

  return (
    <AdminLayout title="Estampas">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Galeria de Estampas</h2>
          <p className="text-muted-foreground">Gerencie as artes e arquivos para produção.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" /> Upload Nova Arte
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Estampa</DialogTitle>
              <DialogDescription>Faça upload de uma imagem ou use uma URL externa.</DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleUpload} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome da Estampa</Label>
                <Input 
                  value={newPrint.name}
                  onChange={e => setNewPrint({...newPrint, name: e.target.value})}
                  required
                  placeholder="Ex: Leão Colorido 2025"
                />
              </div>

              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">URL da Imagem</TabsTrigger>
                  <TabsTrigger value="file">Arquivo Local</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-2">
                  <Label>Cole o link da imagem</Label>
                  <Input 
                    placeholder="https://..." 
                    value={newPrint.url}
                    onChange={e => setNewPrint({...newPrint, url: e.target.value})}
                  />
                </TabsContent>
                <TabsContent value="file">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Clique para selecionar um arquivo</p>
                    <p className="text-xs text-muted-foreground mt-1">(Simulado nesta versão)</p>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button type="submit">Salvar na Galeria</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {prints.map((print) => (
          <Card key={print.id} className="group overflow-hidden">
            <div className="aspect-square bg-secondary/20 relative">
              <img 
                src={print.url} 
                alt={print.name} 
                className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="sm">Editar</Button>
                <Button variant="destructive" size="icon" className="h-9 w-9"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{print.name}</h3>
              <p className="text-xs text-muted-foreground">Adicionado em 10/12/2025</p>
            </CardContent>
          </Card>
        ))}
        
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <Card className="border-dashed border-2 flex items-center justify-center aspect-square bg-secondary/5 hover:bg-secondary/10 transition-colors h-full">
            <div className="text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-primary">Adicionar Nova</h3>
              <p className="text-xs text-muted-foreground mt-1">PNG, SVG ou JPG</p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
