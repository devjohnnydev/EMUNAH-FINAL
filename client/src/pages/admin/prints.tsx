import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Plus } from "lucide-react";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';

const prints = [
  { id: 1, name: "Leão de Judá", url: logoImg },
  { id: 2, name: "Cruz Minimalista", url: logoImg },
  { id: 3, name: "Versículo João 3:16", url: logoImg },
  { id: 4, name: "Fé e Graça", url: logoImg },
  { id: 5, name: "Emunah Logo Full", url: logoImg },
  { id: 6, name: "Espirito Santo", url: logoImg },
];

export default function AdminPrints() {
  return (
    <AdminLayout title="Estampas">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Galeria de Estampas</h2>
          <p className="text-muted-foreground">Gerencie as artes e arquivos para produção.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" /> Upload Nova Arte
        </Button>
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
        
        {/* Placeholder for Upload */}
        <Card className="border-dashed border-2 flex items-center justify-center aspect-square bg-secondary/5 hover:bg-secondary/10 cursor-pointer transition-colors">
          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-primary">Adicionar Nova</h3>
            <p className="text-xs text-muted-foreground mt-1">PNG, SVG ou JPG</p>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
