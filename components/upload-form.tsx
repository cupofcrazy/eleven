'use client'

import cn from 'classnames'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { db } from '@/db/client'
import { posts } from '@/db/schema'
import { useSession } from 'next-auth/react'
import { addNewPost } from '@/actions/post'
import { CreateNewBoard } from './board/new-board'
import { UploadApiResponse } from 'cloudinary'
import { toast } from 'sonner'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
const schema = z.object({
  image: z.instanceof(File, { message: 'Please select an image' }),
  caption: z.string().min(1).max(100)
})

export function UploadForm({ children }: { children?: React.ReactNode }) {
  const session = useSession()
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedTab, setSelectedTab] = useState<'post' | 'board'>('post')
  const [preview, setPreview] = useState<File | null>(null)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (!dialogOpen) {
      setObjectUrl(null)
      setPreview(null)
    }
  }, [dialogOpen])
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setValue('image', file, { shouldValidate: true })
    setPreview(file)
    setObjectUrl(URL.createObjectURL(file))
  }

  
  const onSubmit = async (data: FieldValues) => {
    if (!session.data?.user?.id) {
      toast.error('Please login to upload')
      return
    }

    try {
      const { image, caption } = data
      const formData = new FormData()
      formData.append('image', image)
      formData.append('caption', caption)

      
      const result = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const uploadedImage = await result.json() as UploadApiResponse
      const { url, width, height, format, bytes, asset_id } = uploadedImage;

      console.log(uploadedImage.asset_id)
      
      await addNewPost({
        url,
        assetId: asset_id,
        userId: session.data.user.id,
        width,
        height,
        format,
        size: bytes,
        caption
      })
      
      console.log('Image uploaded:', url)

      setValue('caption', '')
      setValue('image', null)
      setObjectUrl(null)
      setPreview(null)
      setDialogOpen(false)
      formRef.current?.reset()

      toast.success('Image uploaded')
      
    } catch (error) {
      toast.error('Error uploading image', {
        description: error.message as string
      })
    }
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger className='' asChild>
        {children || <button className=" hover:bg-black/5 text-black px-3 py-1 rounded-md">Upload</button>}
      </Dialog.Trigger>
        <AnimatePresence>
          {dialogOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay>
                <motion.div
                className='fixed inset-0 bg-black/50 z-[100]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              </motion.div>
            </Dialog.Overlay>
            <Dialog.Content>
              <motion.div
                className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] bg-white p-4 rounded-[24px] shadow-md will-change-transform z-[200]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
              <div className='flex flex-row justify-between items-center'>
            <Dialog.Title className="hidden">Add New Board</Dialog.Title>
            <Dialog.Description className="hidden">Add New Board</Dialog.Description>
            {/* <CreateNewBoard /> */}
          </div>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row justify-between items-center'>
              <Dialog.Title className='px-3 py-2 bg-black/5 text-black/70 rounded-full'>Share</Dialog.Title>
              <Dialog.Description>Upload</Dialog.Description>
              <Dialog.Close asChild>
                <button className='w-8 h-8 flex items-center justify-center text-black/50 bg-black/5 rounded-full'>
                  <X className='w-4 h-4' />
                </button>
              </Dialog.Close>
            </div>
            {objectUrl && (
              <div className='w-full h-auto mt-4 p-4 bg-black/5 flex items-center justify-center'>
                <img src={objectUrl} alt="Preview" className='w-1/3 border object-cover' />
              </div>
            )}
            <label htmlFor="image" className='block mt-4 w-full h-10 px-4 py-2 bg-black/5 rounded-full'>
              Select an image
            </label>
            <input type="file" id="image" {...register('image')} onChange={handleFileChange} className='hidden' />
            <input type="text" {...register('caption')} placeholder='Caption' className='w-full h-10 my-4 px-4 py-2 bg-black/5 rounded-full' />
            {errors.image && <Badge variant='error'>{errors.image.message as string}</Badge>}
            {errors.caption && <Badge variant='error'>{errors.caption.message as string}</Badge>}
            <button type='submit' className='w-full h-10 mt-4 bg-black text-white rounded-full' disabled={isSubmitting}>{isSubmitting ? 'Uploading...' : 'Upload'}</button>
          </form>
          </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
    </Dialog.Root>
  )
}

type FormProps = React.HTMLAttributes<HTMLFormElement>

const Form = forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
  return (
    <form ref={ref} className={cn(className)} {...props} />
  )
})