import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      <div className="w-full">
        <Skeleton className="h-10 w-full rounded-xl" />

        <div className="mt-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="mt-1 h-4 w-48" />
                    </div>
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                  {i < 3 && <Skeleton className="h-px w-full" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
