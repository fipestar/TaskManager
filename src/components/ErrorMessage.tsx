import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}
export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="bg-linear-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl shadow-lg border border-red-400 mb-4 animate-pulse">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚠️</span>
        <p className="font-semibold text-sm">
          {children}
        </p>
      </div>
    </div>
  )
}
