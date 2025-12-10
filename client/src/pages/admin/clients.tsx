import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, MoreHorizontal, Mail, Phone, UserPlus } from "lucide-react";
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialClients = [
  { id: 1, name: "Igreja Batista Central", contact: "Pr. João", email: "contato@ibcentral.com", phone: "(11) 99999-0000", orders: 12 },
  { id: 2, name: "Grupo Jovens da Fé", contact: "Mariana Silva", email: "jovens@fe.com", phone: "(11) 98888-1111", orders: 5 },
  { id: 3, name: "Associação Beneficente Vida", contact: "Carlos Souza", email: "carlos@vida.org", phone: "(11) 97777-2222", orders: 3 },
  { id: 4, name: "Congregação Nova Esperança", contact: "Pra. Ana", email: "ana@novaesperanca.com", phone: "(11) 96666-3333", orders: 8 },
];

export default function AdminClients() {
  const [clients, setClients] = useState(initialClients);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const [newClient, setNewClient] = useState({ name: "", contact: "", email: "", phone: "" });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    setClients([...clients, { id: Date.now(), ...newClient, orders: 0 }]);
    setOpen(false);
    setNewClient({ name: "", contact: "", email: "", phone: "" });
    toast({
      title: "Cliente cadastrado",
      description: `${newClient.name} foi adicionado com sucesso.`
    });
  };

  return (
    <AdminLayout title="Clientes">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Clientes</h2>
          <p className="text-muted-foreground">Base de clientes e histórico de compras.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>Preencha os dados abaixo para adicionar um novo cliente.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateClient} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Organização/Cliente</Label>
                <Input 
                  id="name" 
                  value={newClient.name} 
                  onChange={e => setNewClient({...newClient, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Pessoa de Contato</Label>
                <Input 
                  id="contact" 
                  value={newClient.contact} 
                  onChange={e => setNewClient({...newClient, contact: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={newClient.email} 
                    onChange={e => setNewClient({...newClient, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    value={newClient.phone} 
                    onChange={e => setNewClient({...newClient, phone: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Cadastrar Cliente</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
