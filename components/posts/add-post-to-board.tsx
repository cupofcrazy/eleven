'use client'

import { addPostToBoard } from '@/actions/post'
import { BoardSchemaType } from '@/lib/types'
import * as Popover from '@radix-ui/react-popover'
import { toast } from 'sonner'

type AddPostToBoardProps = {
  postId: string
  boards: BoardSchemaType[]
  children: React.ReactNode
}

export function AddPostToBoard({ postId, boards, children }: AddPostToBoardProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-2 p-2 bg-white rounded-2xl border border-black/10 shadow-md w-36 mx-4 my-2">
          {/* <h3>Add to board</h3> */}
          {boards.map((board) => (
            <div key={board.id}>
              <button disabled={false} className="w-full text-left disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 rounded-lg px-4 py-2" onClick={async () =>{
                if (confirm(`Add to ${board.name}?`)) {
                  try {
                    await addPostToBoard(postId, board.id)
                  } catch (error) {
                    toast.error('Error adding post to board', {
                      description: error?.message as string
                    })
                  }
                }
              } }>{board.name}</button>
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}