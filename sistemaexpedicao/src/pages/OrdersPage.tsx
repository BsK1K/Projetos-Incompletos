import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Package, Plus, Upload, Eye, Edit, Trash2, Search } from 'lucide-react'
import { useState } from 'react'
import { toast } from '../hooks/use-toast'

const mockOrders = [
  { id: 'ORD-2026-001', customer: 'João Silva', status: 'Pendente', date: '2026-05-01', value: 'R$ 249,90', items: 3 },
  { id: 'ORD-2026-002', customer: 'Maria Santos', status: 'Em Separação', date: '2026-05-01', value: 'R$ 189,50', items: 2 },
  { id: 'ORD-2026-003', customer: 'Pedro Costa', status: 'Enviado', date: '2026-04-30', value: 'R$ 1.249,00', items: 5 },
  { id: 'ORD-2026-004', customer: 'Ana Lima', status: 'Pendente', date: '2026-04-30', value: 'R$ 89,90', items: 1 },
  { id: 'ORD-2026-005', customer: 'Carlos Oliveira', status: 'Entregue', date: '2026-04-29', value: 'R$ 599,00', items: 2 },
]

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showImportCSV, setShowImportCSV] = useState(false)
  const [showDetails, setShowDetails] = useState<null | typeof mockOrders[0]>(null)

  const filteredOrders = mockOrders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Pendente': 'outline',
      'Em Separação': 'secondary',
      'Enviado': 'default',
      'Entregue': 'default',
      'Cancelado': 'destructive',
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os pedidos do seu e-commerce</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowImportCSV(true)} variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importar CSV
          </Button>
          <Button onClick={() => setShowNewOrder(true)} className="flex items-center gap-2 bg-emerald-500 text-white font-medium px-4 py-2 rounded-md hover:bg-emerald-600">
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="bg-white shadow-sm rounded-xl border-zinc-200 mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Buscar por ID do pedido ou cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID do Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-zinc-50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="font-medium">{order.value}</TableCell>
                  <TableCell>{order.items} itens</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowDetails(order)}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                        title="Ver Detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum pedido encontrado. Clique em 'Novo Pedido' para começar.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Order Dialog */}
      <Dialog open={showNewOrder} onOpenChange={setShowNewOrder}>
        <DialogContent onClose={() => setShowNewOrder(false)}>
          <DialogHeader>
            <DialogTitle>Novo Pedido</DialogTitle>
            <DialogDescription>Preencha os dados para criar um novo pedido manualmente.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nome do Cliente</label>
              <Input placeholder="Digite o nome do cliente" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Endereço de Entrega</label>
              <Input placeholder="Digite o endereço completo" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Método de Pagamento</label>
                <select className="w-full h-10 px-3 border border-zinc-200 rounded-md text-sm">
                  <option>Cartão de Crédito</option>
                  <option>Pix</option>
                  <option>Boleto</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Valor Total</label>
                <Input placeholder="R$ 0,00" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewOrder(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                setShowNewOrder(false)
                toast({ title: "✅ Pedido criado com sucesso!", variant: "success" })
              }}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Criar Pedido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import CSV Dialog */}
      <Dialog open={showImportCSV} onOpenChange={setShowImportCSV}>
        <DialogContent onClose={() => setShowImportCSV(false)}>
          <DialogHeader>
            <DialogTitle>Importar Pedidos via CSV</DialogTitle>
            <DialogDescription>Faça upload de um arquivo CSV contendo os pedidos.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-zinc-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">Clique para fazer upload ou arraste o arquivo aqui</p>
              <Input type="file" accept=".csv" className="max-w-xs mx-auto" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowImportCSV(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                setShowImportCSV(false)
                toast({ title: "✅ Pedidos importados com sucesso!", variant: "success" })
              }}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Importar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={!!showDetails} onOpenChange={() => setShowDetails(null)}>
        <DialogContent onClose={() => setShowDetails(null)} className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido {showDetails?.id}</DialogTitle>
            <DialogDescription>Informações completas do pedido</DialogDescription>
          </DialogHeader>
          {showDetails && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium text-gray-900">{showDetails.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(showDetails.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data</p>
                  <p className="font-medium text-gray-900">{showDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valor Total</p>
                  <p className="font-medium text-gray-900">{showDetails.value}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Endereço de Entrega</p>
                <p className="text-gray-900">Rua das Flores, 123 - São Paulo, SP</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Produtos</p>
                <div className="bg-zinc-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Produto A x2</span>
                    <span className="font-medium">R$ 199,80</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Produto B x1</span>
                    <span className="font-medium">R$ 50,10</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
