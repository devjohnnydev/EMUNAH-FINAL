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
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImg from '@assets/generated_images/minimalist_leaf_e_logo_for_emunhah.png';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Produtos", href: "/admin/products" },
    { icon: FileText, label: "Cotações", href: "/admin/quotes" },
    { icon: ShoppingBag, label: "Pedidos", href: "/admin/orders" },
    { icon: Users, label: "Clientes", href: "/admin/clients" },
    { icon: Package, label: "Fornecedores", href: "/admin/suppliers" },
    { icon: Palette, label: "Estampas", href: "/admin/prints" },
    { icon: DollarSign, label: "Financeiro", href: "/admin/finance" },
    { icon: Settings, label: "Configurações", href: "/admin/settings" },
  ];

  const Sidebar = () => (
    <div className="h-full flex flex-col bg-primary text-primary-foreground w-64">
      <div className="p-6 flex items-center gap-3 border-b border-primary-foreground/10">
        <img src={logoImg} alt="Logo" className="h-8 w-8 object-contain brightness-0 invert" />
        <span className="font-serif font-bold text-xl tracking-tight">EMUNAH</span>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location === item.href;
          return (
            <Link key={index} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-11 text-base font-normal ${
                  isActive 
                    ? "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" 
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-primary-foreground/10">
        <Link href="/admin/login">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <LogOut className="h-5 w-5" />
            Sair do Sistema
          </Button>
        </Link>
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
            <h1 className="text-xl font-semibold hidden md:block text-foreground">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar..." 
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
          {children}
        </main>
      </div>
    </div>
  );
}
