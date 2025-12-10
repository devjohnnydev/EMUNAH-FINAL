import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function AdminSettings() {
  return (
    <AdminLayout title="Configurações">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configurações do Sistema</h2>
          <p className="text-muted-foreground">Gerencie as preferências da sua loja e conta.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Perfil da Loja</CardTitle>
            <CardDescription>Informações visíveis nos orçamentos e rodapé.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Loja</Label>
                <Input defaultValue="EMUNHAH" />
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

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie sua senha e acesso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Senha Atual</Label>
              <Input type="password" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nova Senha</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Nova Senha</Label>
                <Input type="password" />
              </div>
            </div>
            <Button className="mt-2">Salvar Alterações</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
