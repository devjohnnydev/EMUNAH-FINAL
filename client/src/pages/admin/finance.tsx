import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  { id: "TRX-9981", desc: "Pagamento Pedido #1001", type: "income", date: "Hoje", amount: "R$ 1.250,00", status: "Confirmado" },
  { id: "TRX-9980", desc: "Compra Tecidos - Malhas Sul", type: "expense", date: "Ontem", amount: "R$ 450,00", status: "Pago" },
  { id: "TRX-9979", desc: "Pagamento Pedido #0998", type: "income", date: "08/12", amount: "R$ 890,00", status: "Confirmado" },
  { id: "TRX-9978", desc: "Manutenção Máquina Estampa", type: "expense", date: "05/12", amount: "R$ 1.200,00", status: "Pago" },
  { id: "TRX-9977", desc: "Adiantamento Pedido #1003", type: "income", date: "05/12", amount: "R$ 1.700,00", status: "Confirmado" },
];

export default function AdminFinance() {
  return (
    <AdminLayout title="Financeiro">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Controle Financeiro</h2>
          <p className="text-muted-foreground">Fluxo de caixa e transações.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.450,00</div>
            <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium">+5% este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas (Dez)</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 18.230,00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas (Dez)</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ 5.780,00</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas movimentações financeiras.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell>
                    <div className="font-medium">{trx.desc}</div>
                    <div className="text-xs text-muted-foreground">{trx.id}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      trx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {trx.type === 'income' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {trx.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </TableCell>
                  <TableCell>{trx.date}</TableCell>
                  <TableCell>{trx.status}</TableCell>
                  <TableCell className={`text-right font-bold ${
                    trx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trx.type === 'income' ? '+' : '-'}{trx.amount}
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
