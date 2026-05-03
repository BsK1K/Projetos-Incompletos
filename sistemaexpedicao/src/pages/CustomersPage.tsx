import { Card, CardContent } from '../components/ui/card'
import { Users } from 'lucide-react'

export default function CustomersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-gray-600 mt-1">Gerencie sua base de clientes</p>
      </div>
      <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
        <CardContent className="p-12 text-center">
          <Users className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum cliente cadastrado</h3>
          <p className="text-gray-500">Os clientes aparecerão aqui conforme os pedidos forem sendo registrados.</p>
        </CardContent>
      </Card>
    </div>
  )
}
