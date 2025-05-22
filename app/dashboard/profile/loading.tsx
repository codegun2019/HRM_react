import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl shadow-sm md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="mt-4 h-6 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
            <Skeleton className="mt-2 h-6 w-20 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="mx-auto h-4 w-24" />
                <Skeleton className="mx-auto mt-1 h-5 w-32" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-[240px] rounded-xl" />
            </div>
            <Skeleton className="mt-2 h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
              <div className="space-y-2 md:col-span-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
