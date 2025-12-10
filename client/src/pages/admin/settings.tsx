import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AdminSettings() {
  return (
    <AdminLayout title="Configurações">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="users">Usuários e Permissões</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil da Loja</CardTitle>
                <CardDescription>Informações visíveis nos orçamentos e rodapé.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Loja</Label>
                    <Input defaultValue="EMUNAH" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email de Contato</Label>
                    <Input defaultValue="contato@emunah.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone / WhatsApp</Label>
                    <Input defaultValue="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input defaultValue="00.000.000/0001-00" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Configure como você deseja ser alertado.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Nova Cotação</Label>
                    <p className="text-sm text-muted-foreground">Receber email quando um cliente solicitar orçamento.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Estoque Baixo</Label>
                    <p className="text-sm text-muted-foreground">Avisar quando material estiver acabando.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
             <Card>
              <CardHeader>
                <CardTitle>Gerenciar Equipe</CardTitle>
                <CardDescription>Controle quem tem acesso ao sistema e suas permissões.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Administrador</p>
                      <p className="text-sm text-muted-foreground">admin@emunah.com</p>
                    </div>
                  </div>
                  <Badge>Admin</Badge>
                </div>

                <div className="flex justify-between items-center border-b pb-4">
                   <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>VD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">João Vendedor</p>
                      <p className="text-sm text-muted-foreground">joao@emunah.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Vendedor</Badge>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>

                 <div className="flex justify-between items-center pb-2">
                   <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>GR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Maria Gerente</p>
                      <p className="text-sm text-muted-foreground">maria@emunah.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Gerente</Badge>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="secondary">
                  Adicionar Novo Usuário
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
