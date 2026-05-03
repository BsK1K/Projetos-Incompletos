import { useToast, type Toast } from "../../hooks/use-toast"
import { cn } from "../../lib/utils"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
            {
              "border-zinc-200 bg-white text-zinc-950": toast.variant === "default" || !toast.variant,
              "border-red-200 bg-red-500 text-white": toast.variant === "destructive",
              "border-emerald-200 bg-emerald-500 text-white": toast.variant === "success",
            }
          )}
        >
          <div className="grid gap-1">
            {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
          </div>
          <button onClick={() => dismiss(toast.id)} className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
