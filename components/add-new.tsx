import * as Popover from '@radix-ui/react-popover'
import { PlusIcon } from 'lucide-react'
import { UploadForm } from './upload-form'
import { CreateNewBoard } from './board/new-board'

export const AddNewContent = () => {
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger className="p-2">
          <PlusIcon className="w-5 h-5" />
        </Popover.Trigger>
        <Popover.Content>
          <div className="flex flex-col gap-2 p-1 border border-black/10 rounded-lg w-[180px] shadow-sm my-2 mx-4">
            <UploadForm />
            <CreateNewBoard />
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}