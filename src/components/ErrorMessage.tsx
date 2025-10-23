import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}
export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="bg-red-600 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
        {children}
    </p>
  )
}
