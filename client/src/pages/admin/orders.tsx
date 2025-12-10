import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Filter } from "lucide-react";
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

const orders = [
  { id: "PED-1001", client: "Igreja Batista Central", date: "10/12/2025", delivery: "20/12/2025", total: "R$ 1.250,00", status: "Produção", step: "Corte" },
  { id: "PED-1002", client: "Grupo Jovens da Fé", date: "09/12/2025", delivery: "15/12/2025", total: "R$ 890,00", status: "Aprovado", step: "Aguardando Início" },
  { id: "PED-1003", client: "Retiro 2025", date: "08/12/2025", delivery: "22/12/2025", total: "R$ 3.400,00", status: "Produção", step: "Estamparia" },
  { id: "PED-1004", client: "Cantata de Natal", date: "01/12/2025", delivery: "08/12/2025", total: "R$ 2.100,00", status: "Entregue", step: "Concluído" },
];

export default function AdminOrders() {
  return (
    <AdminLayout title="Pedidos">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Pedidos</h2>
          <p className="text-muted-foreground">Acompanhe o status de produção e entrega.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["Aprovado", "Produção", "Acabamento", "Entregue"].map((status) => (
          <Card key={status} className="bg-card/50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-primary">
                {orders.filter(o => o.status === status).length}
              </span>
              <span className="text-sm text-muted-foreground">{status}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
          <CardDescription>Pedidos ativos e histórico recente.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data Pedido</TableHead>
                <TableHead>Previsão Entrega</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Etapa Atual</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      order.status === 'Entregue' ? 'bg-green-100 text-green-700 border-green-200' : 
                      order.status === 'Produção' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.step}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Atualizar Status</DropdownMenuItem>
                        <DropdownMenuItem>Imprimir Etiqueta</DropdownMenuItem>
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
