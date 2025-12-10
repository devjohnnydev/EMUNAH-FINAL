import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import logoImg from '@assets/image_1765371462326.png';
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex flex-col items-center gap-2 group">
            <img 
              src={logoImg} 
              alt="EMUNAH Logo" 
              className="h-16 w-16 object-contain transition-transform group-hover:scale-110 duration-500" 
            />
            <span className="font-serif font-bold text-2xl tracking-tight text-primary">EMUNAH</span>
          </Link>
        </div>

        <Card className="border-none shadow-xl bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif text-primary">Acesso Restrito</CardTitle>
            <CardDescription>
              Sistema de Vendas e Orçamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@emunah.com" 
                  defaultValue="admin@emunah.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  defaultValue="password"
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Acessar Sistema
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6 mt-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Voltar para a Loja
            </Link>
          </CardFooter>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-8 opacity-60">
          © {new Date().getFullYear()} EMUNAH System v1.0
        </p>
      </div>
    </div>
  );
}
