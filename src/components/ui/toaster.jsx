"use client"
import { useToast } from "../../hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-in slide-in-from-right"
        >
          {toast.title && <h3 className="font-medium">{toast.title}</h3>}
          {toast.description && <p className="text-sm text-gray-500">{toast.description}</p>}
          <button
            onClick={() => dismiss(toast.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

