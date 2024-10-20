import { ClassValue } from "clsx"
import { cn } from "../../lib/utils"
const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: ClassValue
}) => {
  return <div className={cn("mx-5", className)}>{children}</div>
}

export default Container
