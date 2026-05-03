import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline" }) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
      {
        "border-transparent bg-emerald-500 text-white": variant === "default",
        "border-transparent bg-zinc-100 text-zinc-900": variant === "secondary",
        "border-transparent bg-red-500 text-white": variant === "destructive",
        "text-zinc-950 border-zinc-200": variant === "outline",
      },
      className
    )} {...props} />
  )
}

export { Badge }
