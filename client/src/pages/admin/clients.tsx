import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const clients = [
  { id: 1, name: "Igreja Batista Central", contact: "Pr. João", email: "contato@ibcentral.com", phone: "(11) 99999-0000", orders: 12 },
  { id: 2, name: "Grupo Jovens da Fé", contact: "Mariana Silva", email: "jovens@fe.com", phone: "(11) 98888-1111", orders: 5 },
  { id: 3, name: "Associação Beneficente Vida", contact: "Carlos Souza", email: "carlos@vida.org", phone: "(11) 97777-2222", orders: 3 },
  { id: 4, name: "Congregação Nova Esperança", contact: "Pra. Ana", email: "ana@novaesperanca.com", phone: "(11) 96666-3333", orders: 8 },
];

export default function AdminClients() {
  return (
    <AdminLayout title="Clientes">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Clientes</h2>
          <p className="text-muted-foreground">Base de clientes e histórico de compras.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus Clientes</CardTitle>
          <CardDescription>Lista completa de clientes cadastrados.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{client.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Mail className="h-3 w-3" />
                      {client.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </div>
                  </TableCell>
                  <TableCell>{client.orders}</TableCell>
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
                        <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
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
