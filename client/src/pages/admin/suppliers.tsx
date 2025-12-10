import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, MoreHorizontal, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const suppliers = [
  { id: 1, name: "Tecidos Premium LTDA", category: "Tecidos", rating: 5, status: "Ativo", contact: "Roberto" },
  { id: 2, name: "Estamparia Rápida", category: "Serviço", rating: 4, status: "Ativo", contact: "Fernanda" },
  { id: 3, name: "Embalagens & Cia", category: "Embalagem", rating: 5, status: "Ativo", contact: "Ricardo" },
  { id: 4, name: "Malhas do Sul", category: "Tecidos", rating: 3, status: "Inativo", contact: "Juliana" },
];

export default function AdminSuppliers() {
  return (
    <AdminLayout title="Fornecedores">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fornecedores</h2>
          <p className="text-muted-foreground">Gestão de parceiros e fornecedores de matéria-prima.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Novo Fornecedor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Fornecedores</CardTitle>
          <CardDescription>Parceiros cadastrados no sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: supplier.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === 'Ativo' ? 'default' : 'secondary'}>
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Histórico de Compras</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Desativar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
