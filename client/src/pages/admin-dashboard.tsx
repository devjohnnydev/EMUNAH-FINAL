import AdminLayout from "@/components/admin-layout";
import { 
  FileText, 
  ShoppingBag, 
  Users, 
  DollarSign,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, CartesianGrid } from "recharts";

const monthlyData = [
  { name: "Jan", sales: 12000, quotes: 15, clients: 5 },
  { name: "Fev", sales: 18000, quotes: 22, clients: 8 },
  { name: "Mar", sales: 15000, quotes: 18, clients: 6 },
  { name: "Abr", sales: 22000, quotes: 25, clients: 12 },
  { name: "Mai", sales: 28000, quotes: 30, clients: 15 },
  { name: "Jun", sales: 26000, quotes: 28, clients: 10 },
];

const recentOrders = [
  { id: "ORD-001", client: "Igreja Batista Central", status: "Produção", date: "Hoje", value: "R$ 1.250,00" },
  { id: "ORD-002", client: "Grupo Jovens da Fé", status: "Aprovado", date: "Hoje", value: "R$ 890,00" },
  { id: "ORD-003", client: "Retiro 2025", status: "Cotação", date: "Ontem", value: "R$ 3.400,00" },
  { id: "ORD-004", client: "Cantata de Natal", status: "Entregue", date: "08/12", value: "R$ 2.100,00" },
  { id: "ORD-005", client: "Congregação Zona Sul", status: "Aprovado", date: "07/12", value: "R$ 540,00" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard Gerencial">
      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/90">Vendas Totais (Jun)</CardTitle>
            <DollarSign className="h-4 w-4 text-primary-foreground/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 26.000,00</div>
            <p className="text-xs text-primary-foreground/70 mt-1">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamentos Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">Taxa de conversão de 64%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes (Mês)</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground mt-1">+2 novos esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos em Aberto</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">3 precisam de atenção</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Desempenho de Vendas</CardTitle>
            <CardDescription>Comparativo mensal de receita e volume de orçamentos</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                    tickFormatter={(value) => `R$${value/1000}k`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                    name="Vendas (R$)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Últimos Pedidos</CardTitle>
            <CardDescription>Monitoramento em tempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between group hover:bg-muted/50 p-2 rounded-lg transition-colors -mx-2">
                  <div className="flex items-center gap-4">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center border ${
                      order.status === "Aprovado" ? "bg-green-100 text-green-700 border-green-200" :
                      order.status === "Produção" ? "bg-blue-100 text-blue-700 border-blue-200" :
                      order.status === "Entregue" ? "bg-gray-100 text-gray-700 border-gray-200" :
                      "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }`}>
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{order.client}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.id} • {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold">{order.value}</span>
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 h-5 border-0 ${
                      order.status === "Aprovado" ? "bg-green-100 text-green-700" :
                      order.status === "Produção" ? "bg-blue-100 text-blue-700" :
                      order.status === "Entregue" ? "bg-gray-100 text-gray-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6" size="sm">
              Ver Todos os Pedidos
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">142</span>
              <Activity className="h-4 w-4 text-green-500" />
            </div>
            <div className="h-2 w-full bg-secondary/30 mt-3 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[70%]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Meta Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">85%</span>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="h-2 w-full bg-secondary/30 mt-3 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[85%]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">R$ 485</span>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="h-2 w-full bg-secondary/30 mt-3 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 w-[60%]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
