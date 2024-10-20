import { cn } from "../../lib/utils"

const ScrollArea = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <section
      className={cn(
        "h-96 border border-stone-500 px-4 rounded-xl overflow-y-scroll py-4",
        className,
      )}
    >
      {children}
    </section>
  )
}

export default ScrollArea
