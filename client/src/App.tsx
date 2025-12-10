import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ProductPage from "@/pages/product";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import About from "@/pages/about";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminQuotes from "@/pages/admin/quotes";
import AdminNewQuote from "@/pages/admin/quotes/new";
import AdminOrders from "@/pages/admin/orders";
import AdminClients from "@/pages/admin/clients";
import AdminSuppliers from "@/pages/admin/suppliers";
import AdminPrints from "@/pages/admin/prints";
import AdminFinance from "@/pages/admin/finance";
import AdminSettings from "@/pages/admin/settings";
import AdminProducts from "@/pages/admin/products";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:slug" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/about" component={About} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/quotes" component={AdminQuotes} />
      <Route path="/admin/quotes/new" component={AdminNewQuote} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/clients" component={AdminClients} />
      <Route path="/admin/suppliers" component={AdminSuppliers} />
      <Route path="/admin/prints" component={AdminPrints} />
      <Route path="/admin/finance" component={AdminFinance} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
