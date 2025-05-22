import { Loader2 } from "lucide-react"

export default function AuthLoading() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
}
