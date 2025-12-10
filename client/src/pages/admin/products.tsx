import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Package, Upload, Image } from "lucide-react";
import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function AdminProducts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    category: "Roupas",
    image: "",
    stock: 0,
    active: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Erro no upload');
      }

      const result = await response.json();
      setFormData(prev => ({ ...prev, image: result.url }));
      toast({ title: "Imagem enviada com sucesso!" });
    } catch (error) {
      toast({ 
        title: "Erro ao enviar imagem", 
        description: "Tente novamente.",
        variant: "destructive" 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produto criado com sucesso!" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ 
        title: "Erro ao criar produto", 
        description: "Verifique os dados e tente novamente.",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest("PATCH", `/api/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produto atualizado com sucesso!" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ 
        title: "Erro ao atualizar produto",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produto removido com sucesso!" });
    },
    onError: () => {
      toast({ 
        title: "Erro ao remover produto",
        variant: "destructive" 
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      price: "",
      description: "",
      category: "Roupas",
      image: "",
      stock: 0,
      active: true
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      price: formData.price.toString(),
      stock: parseInt(formData.stock.toString()) || 0
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: dataToSubmit });
    } else {
      createMutation.mutate(dataToSubmit);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock || 0,
      active: product.active ?? true
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      deleteMutation.mutate(id);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <AdminLayout title="Gerenciar Produtos">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Catálogo de Produtos</h2>
          <p className="text-muted-foreground">Adicione, edite ou remova produtos da loja.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-add-product">
              <Plus className="h-4 w-4" /> Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Editar Produto" : "Novo Produto"}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados do produto. Todos os campos são obrigatórios.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      data-testid="input-product-name"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setFormData(prev => ({ 
                          ...prev, 
                          name,
                          slug: generateSlug(name)
                        }));
                      }}
                      placeholder="Ex: Camiseta Básica"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      data-testid="input-product-slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="camiseta-basica"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      data-testid="input-product-price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="89.90"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger id="category" data-testid="select-product-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Roupas">Roupas</SelectItem>
                        <SelectItem value="Acessórios">Acessórios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Estoque</Label>
                    <Input
                      id="stock"
                      data-testid="input-product-stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    data-testid="textarea-product-description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o produto..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagem do Produto</Label>
                  <div className="flex flex-col gap-3">
                    {formData.image && (
                      <div className="relative w-32 h-32 rounded-md overflow-hidden border bg-secondary/20">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        className="hidden"
                        data-testid="input-product-image-file"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="gap-2"
                        data-testid="button-upload-image"
                      >
                        {isUploading ? (
                          <>
                            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Enviar Imagem
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="image" className="text-xs text-muted-foreground">Ou insira a URL manualmente:</Label>
                      <Input
                        id="image"
                        data-testid="input-product-image"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="/generated_images/produto.png"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sugestões de URL: /generated_images/t-shirt_mockup_with_logo.png ou /generated_images/mug_mockup_with_logo.png
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    data-testid="checkbox-product-active"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="active" className="text-sm font-normal">
                    Produto ativo (visível na loja)
                  </Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-product"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? "Salvando..." : "Salvar Produto"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos Cadastrados</CardTitle>
          <CardDescription>Lista completa de produtos no sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando produtos...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>
              <p className="text-sm text-muted-foreground">Clique em "Novo Produto" para começar.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} data-testid={`row-product-${product.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded overflow-hidden bg-secondary/20">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.slug}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">R$ {product.price}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock && product.stock > 10 ? "default" : "secondary"}>
                        {product.stock || 0} un
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.active ? "default" : "outline"}>
                        {product.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                          data-testid={`button-edit-${product.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteMutation.isPending}
                          data-testid={`button-delete-${product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
