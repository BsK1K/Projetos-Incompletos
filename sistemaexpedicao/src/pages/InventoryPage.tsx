import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Boxes, Plus, Package, Search, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
import { toast } from '../hooks/use-toast'

const mockProducts = [
  { sku: 'CAM-BAS-PRE-M', name: 'Camiseta Básica Preta', parentSku: 'CAM-BAS', variation: 'Preta M', qty: 3, location: 'A-01-02', status: 'Baixo' },
  { sku: 'CAM-BAS-PRE-G', name: 'Camiseta Básica Preta', parentSku: 'CAM-BAS', variation: 'Preta G', qty: 15, location: 'A-01-03', status: 'Normal' },
  { sku: 'CAM-BAS-BRC-M', name: 'Camiseta Básica Branca', parentSku: 'CAM-BAS', variation: 'Branca M', qty: 8, location: 'A-01-04', status: 'Baixo' },
  { sku: 'TEN-ESP-42', name: 'Tênis Esportivo', parentSku: 'TEN-ESP', variation: '42', qty: 2, location: 'B-02-01', status: 'Crítico' },
  { sku: 'TEN-ESP-44', name: 'Tênis Esportivo', parentSku: 'TEN-ESP', variation: '44', qty: 12, location: 'B-02-02', status: 'Normal' },
  { sku: 'NOTE-GAM-X1', name: 'Notebook Gamer X1', parentSku: 'NOTE-GAM', variation: '-', qty: 1, location: 'C-03-01', status: 'Crítico' },
]

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [showNewProduct, setShowNewProduct] = useState(false)

  const filtered = mockProducts.filter(p =>
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    if (status === 'Crítico') return <Badge variant="destructive">{status}</Badge>
    if (status === 'Baixo') return <Badge variant="outline" className="border-amber-300 text-amber-700">{status}</Badge>
    return <Badge variant="default">{status}</Badge>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventário</h1>
          <p className="text-gray-600 mt-1">Gerencie produtos, SKUs e estoque</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowNewProduct(true)} className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Novo Produto
          </Button>
          <Button onClick={() => setShowNewEntry(true)} className="flex items-center gap-2 bg-emerald-500 text-white font-medium px-4 py-2 rounded-md hover:bg-emerald-600">
            <Plus className="h-4 w-4" />
            Nova Entrada
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm rounded-xl border-zinc-200 mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Buscar por SKU ou nome do produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Ordenar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Variação</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.sku} className="hover:bg-zinc-50">
                  <TableCell className="font-mono text-sm">{p.sku}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-gray-600">{p.variation}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${p.qty <= 3 ? 'text-red-600' : p.qty <= 8 ? 'text-amber-600' : 'text-gray-900'}`}>
                      {p.qty}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{p.location}</TableCell>
                  <TableCell>{getStatusBadge(p.status)}</TableCell>
                  <TableCell className="text-right">
                    <button className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Ajustar Estoque">
                      <Package className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Boxes className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum produto encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nova Entrada Dialog */}
      <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
        <DialogContent onClose={() => setShowNewEntry(false)} className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Entrada de Estoque</DialogTitle>
            <DialogDescription>Informe os dados da nota fiscal para dar entrada na mercadoria.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Número da NF</label>
                <Input placeholder="Ex: 123456" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Fornecedor</label>
                <Input placeholder="Nome do fornecedor" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Produto</label>
              <select className="w-full h-10 px-3 border border-zinc-200 rounded-md text-sm">
                <option>Camiseta Básica (CAM-BAS)</option>
                <option>Tênis Esportivo (TEN-ESP)</option>
                <option>Notebook Gamer (NOTE-GAM)</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Variação (SKU)</label>
                <Input placeholder="Ex: Preta M" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Quantidade</label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Localização</label>
                <Input placeholder="Ex: A-01-02" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewEntry(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                setShowNewEntry(false)
                toast({ title: "✅ Entrada registrada com sucesso!", variant: "success" })
              }}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Confirmar Entrada
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Novo Produto Dialog */}
      <Dialog open={showNewProduct} onOpenChange={setShowNewProduct}>
        <DialogContent onClose={() => setShowNewProduct(false)} className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogDescription>Cadastre um novo produto com suas variações de SKU.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700">SKU do Produto (Pai)</label>
              <Input placeholder="Ex: CAM-BAS" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nome do Produto</label>
              <Input placeholder="Ex: Camiseta Básica" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea className="w-full h-20 px-3 py-2 text-sm border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" placeholder="Descrição do produto..." />
            </div>
            <div className="border border-zinc-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Variações de SKU (Filhos)</p>
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-3 items-end">
                  <Input placeholder="SKU Variação" className="text-sm" />
                  <Input placeholder="Cor/Tamanho" className="text-sm" />
                  <Input type="number" placeholder="Qtd" className="text-sm" />
                  <Input placeholder="Localização" className="text-sm" />
                </div>
                <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200">+ Adicionar Variação</Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewProduct(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                setShowNewProduct(false)
                toast({ title: "✅ Produto cadastrado com sucesso!", variant: "success" })
              }}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Cadastrar Produto
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
