import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Download, Send, MoreHorizontal } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const quotes = [
  { id: "COT-2025-042", client: "Igreja Batista Central", date: "10/12/2025", items: "50x Camisetas, 50x Canecas", total: "R$ 3.450,00", status: "Pendente" },
  { id: "COT-2025-041", client: "Grupo Jovens da Fé", date: "09/12/2025", items: "30x Camisetas Premium", total: "R$ 1.800,00", status: "Aprovada" },
  { id: "COT-2025-040", client: "Retiro Espiritual 2025", date: "08/12/2025", items: "100x Camisetas Básicas", total: "R$ 4.200,00", status: "Enviada" },
  { id: "COT-2025-039", client: "Cantata de Natal", date: "05/12/2025", items: "20x Vestidos Coral", total: "R$ 2.800,00", status: "Rejeitada" },
];

export default function AdminQuotes() {
  return (
    <AdminLayout title="Cotações">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Cotações</h2>
          <p className="text-muted-foreground">Crie e gerencie orçamentos para seus clientes.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Nova Cotação
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cotações Recentes</CardTitle>
          <CardDescription>Lista de todas as cotações geradas no sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cotação</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.client}</TableCell>
                  <TableCell>{quote.date}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={quote.items}>{quote.items}</TableCell>
                  <TableCell>{quote.total}</TableCell>
                  <TableCell>
                    <Badge variant={
                      quote.status === 'Aprovada' ? 'default' : 
                      quote.status === 'Rejeitada' ? 'destructive' : 
                      quote.status === 'Enviada' ? 'secondary' : 'outline'
                    } className={
                      quote.status === 'Aprovada' ? 'bg-green-600' : ''
                    }>
                      {quote.status}
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
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Editar Cotação</DropdownMenuItem>
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Download className="h-4 w-4" /> Baixar PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Send className="h-4 w-4" /> Enviar por Email
                        </DropdownMenuItem>
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
