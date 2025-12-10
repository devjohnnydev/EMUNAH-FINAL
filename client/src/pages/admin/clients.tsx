import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, MoreHorizontal, Mail, Phone, UserPlus, MapPin, Loader2, Search } from "lucide-react";
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
import { useViaCep } from "@/hooks/use-viacep";

const initialClients = [
  { id: 1, name: "Igreja Batista Central", contact: "Pr. João", email: "contato@ibcentral.com", phone: "(11) 99999-0000", orders: 12, city: "São Paulo", state: "SP" },
  { id: 2, name: "Grupo Jovens da Fé", contact: "Mariana Silva", email: "jovens@fe.com", phone: "(11) 98888-1111", orders: 5, city: "Rio de Janeiro", state: "RJ" },
  { id: 3, name: "Associação Beneficente Vida", contact: "Carlos Souza", email: "carlos@vida.org", phone: "(11) 97777-2222", orders: 3, city: "Belo Horizonte", state: "MG" },
  { id: 4, name: "Congregação Nova Esperança", contact: "Pra. Ana", email: "ana@novaesperanca.com", phone: "(11) 96666-3333", orders: 8, city: "Curitiba", state: "PR" },
];

export default function AdminClients() {
  const [clients, setClients] = useState(initialClients);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { fetchAddress, isLoading: isCepLoading, error: cepError } = useViaCep();
  
  const [newClient, setNewClient] = useState({ 
    name: "", 
    contact: "", 
    email: "", 
    phone: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    setNewClient(prev => ({ ...prev, cep: value }));
  };

  const handleCepBlur = async () => {
    const cleanCep = newClient.cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      const address = await fetchAddress(cleanCep);
      if (address) {
        setNewClient(prev => ({
          ...prev,
          street: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.stateCode,
        }));
        toast({
          title: "Endereço encontrado!",
          description: `${address.street}, ${address.city} - ${address.stateCode}`,
        });
      }
    }
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    setClients([...clients, { 
      id: Date.now(), 
      name: newClient.name,
      contact: newClient.contact,
      email: newClient.email,
      phone: newClient.phone,
      city: newClient.city,
      state: newClient.state,
      orders: 0 
    }]);
    setOpen(false);
    setNewClient({ name: "", contact: "", email: "", phone: "", cep: "", street: "", number: "", neighborhood: "", city: "", state: "" });
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
            <Button className="gap-2" data-testid="button-new-client">
              <Plus className="h-4 w-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  data-testid="input-client-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Pessoa de Contato</Label>
                <Input 
                  id="contact" 
                  value={newClient.contact} 
                  onChange={e => setNewClient({...newClient, contact: e.target.value})} 
                  required 
                  data-testid="input-client-contact"
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
                    data-testid="input-client-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    value={newClient.phone} 
                    onChange={e => setNewClient({...newClient, phone: e.target.value})} 
                    required 
                    data-testid="input-client-phone"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Endereço
                </h4>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="cep"
                        placeholder="00000-000"
                        value={newClient.cep}
                        onChange={handleCepChange}
                        onBlur={handleCepBlur}
                        maxLength={9}
                        data-testid="input-client-cep"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={handleCepBlur}
                        disabled={isCepLoading}
                        data-testid="button-search-cep"
                      >
                        {isCepLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {cepError && (
                      <p className="text-xs text-destructive">{cepError}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Digite o CEP para preencher automaticamente
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input 
                        id="street"
                        value={newClient.street}
                        onChange={e => setNewClient({...newClient, street: e.target.value})}
                        data-testid="input-client-street"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input 
                        id="number"
                        value={newClient.number}
                        onChange={e => setNewClient({...newClient, number: e.target.value})}
                        data-testid="input-client-number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input 
                      id="neighborhood"
                      value={newClient.neighborhood}
                      onChange={e => setNewClient({...newClient, neighborhood: e.target.value})}
                      data-testid="input-client-neighborhood"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input 
                        id="city"
                        value={newClient.city}
                        onChange={e => setNewClient({...newClient, city: e.target.value})}
                        data-testid="input-client-city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input 
                        id="state"
                        placeholder="UF"
                        maxLength={2}
                        value={newClient.state}
                        onChange={e => setNewClient({...newClient, state: e.target.value.toUpperCase()})}
                        data-testid="input-client-state"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" data-testid="button-save-client">Cadastrar Cliente</Button>
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
                <TableHead className="w-[250px]">Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} data-testid={`row-client-${client.id}`}>
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
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3" />
                      {client.city}/{client.state}
                    </div>
                  </TableCell>
                  <TableCell>{client.orders}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-menu-${client.id}`}>
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
