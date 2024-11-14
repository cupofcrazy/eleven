'use client'

import { TrashIcon } from "lucide-react"
import { toast } from "sonner"

type DeletePostProps = {
  onDelete: () => Promise<void>,
  children: React.ReactNode
}

export function DeleteButton({ onDelete, children }: DeletePostProps) {
  return (
    <button onClick={ async () => {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await onDelete()
          toast.success("Post deleted")
        } catch (error) {
          console.error(error)
          toast.error("Failed to delete post", {
            description: error instanceof Error ? error.message : "Unknown error"
          })
        }
      }
    }}>
      {children}
    </button>
  )
}