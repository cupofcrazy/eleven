'use client'

import z from "zod"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Select from '@radix-ui/react-select'
import { ChevronDown } from "lucide-react"
import { createBoard } from "@/actions/board"
import { type BoardSchemaType } from "@/lib/types"
import { forwardRef } from "react"
import { toast } from "sonner"
import { Badge } from "../ui/badge"


const schema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  // mode: z.enum(['public', 'private']),
})

export const CreateNewBoard = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<BoardSchemaType>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: BoardSchemaType) => {
    try {
      await createBoard(data)
      toast.success('Board created')
      reset()
    } catch (error) {
      toast.error('Error creating board', {
        description: error?.message as string
      })
    }
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* <h1>Create New Board</h1> */}
      <Input type="text" {...register('name')} placeholder="Name" />
      {errors.name && <Badge variant="error">{errors.name.message}</Badge>}
      <Input type="text" {...register('description')} placeholder="Description" />
      {errors.description && <Badge variant="error">{errors.description.message}</Badge>}
      <Select.Root>
        <Select.Trigger className="flex items-center justify-between bg-gray-100 rounded-2xl px-4 py-2 w-full">
          <Select.Value placeholder="Choose mode" />
          <ChevronDown className="w-4 h-4" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-[red] w-[100vw]">
            <Select.Viewport>
              <Select.Group>
                <Select.Item value="public">Public</Select.Item>
                <Select.Item value="private">Private</Select.Item>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <button className="bg-black rounded-2xl px-4 py-2 w-full text-white" type="submit">Create</button>
    </form>
  )
}

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<InputProps> = forwardRef(({ ...props }, ref) => {
  return <input className=" bg-gray-100 rounded-2xl px-4 py-2 w-full" {...props} ref={ref} />
})