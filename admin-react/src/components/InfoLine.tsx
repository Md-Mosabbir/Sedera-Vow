import { cn } from "../../lib/utils"

type InfoProps = {
  title: string
  value: string
  hClassName?: string
  spanClassName?: string
}

const InfoLine = ({ title, value, hClassName, spanClassName }: InfoProps) => {
  return (
    <div>
      <h2 className={cn("font-bold text-lg", hClassName)}>
        {title}
        <span className={cn("font-medium text-base text-white", spanClassName)}>
          {value}
        </span>
      </h2>
    </div>
  )
}

export default InfoLine
