import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie as configurações do sistema</p>
      </div>
      <div className="space-y-6">
        {/* Company Info */}
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>Dados básicos da sua operação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
                <Input defaultValue="LogiFlow Operações Ltda" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">CNPJ</label>
                <Input defaultValue="12.345.678/0001-90" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Endereço</label>
              <Input defaultValue="Rua da Logística, 1000 - São Paulo, SP" />
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>Configure integrações com plataformas e serviços</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <div>
                <p className="font-medium text-sm text-gray-900">Correios</p>
                <p className="text-xs text-gray-500">Integração para etiquetas e rastreamento</p>
              </div>
              <Select className="w-32">
                <option>Desconectado</option>
                <option>Conectado</option>
              </Select>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <div>
                <p className="font-medium text-sm text-gray-900">Emissão de NF</p>
                <p className="text-xs text-gray-500">API de emissão fiscal brasileira</p>
              </div>
              <Select className="w-32">
                <option>Desconectado</option>
                <option>Conectado</option>
              </Select>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-sm text-gray-900">Google OAuth</p>
                <p className="text-xs text-gray-500">Login via Google para usuários</p>
              </div>
              <Select className="w-32">
                <option>Desconectado</option>
                <option>Conectado</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
          <CardHeader>
            <CardTitle>Perfil do Usuário</CardTitle>
            <CardDescription>Suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <Input defaultValue="Administrador" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">E-mail</label>
                <Input defaultValue="admin@logiflow.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Função</label>
              <Input defaultValue="Administrador (admin)" disabled />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}
