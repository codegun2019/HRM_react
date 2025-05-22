"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form validation schema
const permissionFormSchema = z.object({
  name: z.string().min(3, { message: "Permission name must be at least 3 characters" }),
  resource: z.string({ required_error: "Please select a resource" }),
  action: z.string({ required_error: "Please select an action" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
})

export type PermissionFormValues = z.infer<typeof permissionFormSchema>

// Available resources and actions
const resources = ["users", "roles", "permissions", "dashboard", "logs", "settings"]
const actions = ["view", "create", "edit", "delete", "assign"]

interface PermissionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: PermissionFormValues) => Promise<void>
  defaultValues?: Partial<PermissionFormValues>
  isEditMode?: boolean
}

export function PermissionForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  isEditMode = false,
}: PermissionFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: {
      name: "",
      resource: "",
      action: "",
      description: "",
      ...defaultValues,
    },
  })

  // Update name when resource or action changes
  const resource = form.watch("resource")
  const action = form.watch("action")

  // Update name field when resource or action changes
  const updateName = () => {
    if (resource && action && !isEditMode) {
      form.setValue("name", `${resource}.${action}`)
    }
  }

  // Handle form submission
  async function handleSubmit(data: PermissionFormValues) {
    setIsLoading(true)
    try {
      await onSubmit(data)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Permission" : "Create New Permission"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update permission details." : "Add a new permission to the system."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="resource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setTimeout(updateName, 0)
                      }}
                      defaultValue={field.value}
                      disabled={isLoading || isEditMode}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select resource" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resources.map((resource) => (
                          <SelectItem key={resource} value={resource}>
                            {resource.charAt(0).toUpperCase() + resource.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setTimeout(updateName, 0)
                      }}
                      defaultValue={field.value}
                      disabled={isLoading || isEditMode}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {actions.map((action) => (
                          <SelectItem key={action} value={action}>
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. users.view"
                      className="rounded-xl"
                      disabled={isLoading || (!isEditMode && resource && action)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe what this permission allows"
                      className="rounded-xl"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="rounded-xl">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update Permission"
                ) : (
                  "Create Permission"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
