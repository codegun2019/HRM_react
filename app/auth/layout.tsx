import type React from "react"
import { ShieldCheck } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">AdminPanel</h1>
          <p className="mt-2 text-sm text-gray-500">Secure admin dashboard</p>
        </div>
        {children}
      </div>
    </div>
  )
}
