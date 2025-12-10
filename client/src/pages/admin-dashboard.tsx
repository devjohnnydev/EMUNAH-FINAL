import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Users, 
  Package, 
  Palette, 
  DollarSign, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard", active: true },
    { icon: FileText, label: "Cotações", href: "/admin/dashboard" },
    { icon: ShoppingBag, label: "Pedidos", href: "/admin/dashboard" },
    { icon: Users, label: "Clientes", href: "/admin/dashboard" },
    { icon: Package, label: "Fornecedores", href: "/admin/dashboard" },
    { icon: Palette, label: "Estampas", href: "/admin/dashboard" },
    { icon: DollarSign, label: "Financeiro", href: "/admin/dashboard" },
    { icon: Settings, label: "Configurações", href: "/admin/dashboard" },
  ];

  const Sidebar = () => (
    <div className="h-full flex flex-col bg-primary text-primary-foreground w-64">
      <div className="p-6 flex items-center gap-3 border-b border-primary-foreground/10">
        <img src={logoImg} alt="Logo" className="h-8 w-8 object-contain brightness-0 invert" />
        <span className="font-serif font-bold text-xl tracking-tight">EMUNAH</span>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start gap-3 h-11 text-base font-normal ${
              item.active 
                ? "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" 
                : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>

      <div className="p-4 border-t border-primary-foreground/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          onClick={() => setLocation("/admin/login")}
        >
          <LogOut className="h-5 w-5" />
          Sair do Sistema
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold hidden md:block text-foreground">Visão Geral</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar pedido, cliente..." 
                className="w-full h-9 pl-9 pr-4 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">Administrador</p>
                <p className="text-xs text-muted-foreground">admin@emunah.com</p>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-secondary/10">
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
        </main>
      </div>
    </div>
  );
}
