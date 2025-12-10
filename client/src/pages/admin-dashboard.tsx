import AdminLayout from "@/components/admin-layout";
import { 
  FileText, 
  ShoppingBag, 
  Users, 
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", total: 12000 },
  { name: "Fev", total: 18000 },
  { name: "Mar", total: 15000 },
  { name: "Abr", total: 22000 },
  { name: "Mai", total: 28000 },
  { name: "Jun", total: 26000 },
];

const recentOrders = [
  { id: "ORD-001", client: "Igreja Batista Central", status: "Produção", date: "Hoje", value: "R$ 1.250,00" },
  { id: "ORD-002", client: "Grupo Jovens da Fé", status: "Aprovado", date: "Hoje", value: "R$ 890,00" },
  { id: "ORD-003", client: "Retiro 2025", status: "Cotação", date: "Ontem", value: "R$ 3.400,00" },
  { id: "ORD-004", client: "Cantata de Natal", status: "Entregue", date: "08/12", value: "R$ 2.100,00" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotações Abertas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">4 aguardando aprovação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos em Produção</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-xs text-muted-foreground">2 em fase de estamparia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+573</div>
            <p className="text-xs text-muted-foreground">+12% desde a semana passada</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral de Vendas</CardTitle>
            <CardDescription>Receita mensal em 2025</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimas movimentações do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.id} • {order.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold">{order.value}</span>
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 h-5 ${
                      order.status === "Aprovado" ? "bg-green-100 text-green-700 border-green-200" :
                      order.status === "Produção" ? "bg-blue-100 text-blue-700 border-blue-200" :
                      order.status === "Entregue" ? "bg-gray-100 text-gray-700 border-gray-200" :
                      "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
