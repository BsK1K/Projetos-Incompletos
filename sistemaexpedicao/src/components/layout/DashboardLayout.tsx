import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Boxes, Users, BarChart3, Settings2, LogOut } from 'lucide-react'
import { cn } from '../../lib/utils'

const menuItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders', icon: Package, label: 'Pedidos' },
  { to: '/inventory', icon: Boxes, label: 'Inventário' },
  { to: '/customers', icon: Users, label: 'Clientes' },
  { to: '/reports', icon: BarChart3, label: 'Relatórios' },
  { to: '/settings', icon: Settings2, label: 'Configurações' },
]

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-zinc-900 to-zinc-800 text-white flex flex-col">
        <div className="p-6">
          <h1 className="font-bold text-xl text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            LogiFlow
          </h1>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 font-medium',
                  isActive
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-700">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors duration-200 font-medium">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-zinc-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">LogiFlow</h2>
            <nav className="flex items-center gap-6">
              <a href="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Dashboard</a>
              <a href="/orders" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Pedidos</a>
              <a href="/inventory" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Estoque</a>
              <a href="/customers" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Clientes</a>
              <a href="/reports" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Relatórios</a>
              <a href="/settings" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Configurações</a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
