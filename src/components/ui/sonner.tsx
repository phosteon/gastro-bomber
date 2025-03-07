
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black/80 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-white/90 group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-300/80",
          actionButton:
            "group-[.toast]:bg-[#22C55E] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-dark-elegant-accent group-[.toast]:text-white/80",
          info: "!bg-dark-elegant-surface !border-[#22C55E]/30 !text-white",
          success: "!bg-black/80 !border-[#22C55E]/40 !text-[#22C55E]",
          warning: "!bg-black/80 !border-yellow-500/30 !text-yellow-400",
          error: "!bg-black/80 !border-red-500/30 !text-red-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
