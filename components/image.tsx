'use client'

import NextImage, { ImageProps } from 'next/image'
import cn from 'classnames'
import { useState } from 'react'

type Props = ImageProps & {
  ar?: number
}

export const Image = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-fit h-fit">
      <NextImage {...props} className={cn("bg-black/10 w-fit h-fit", props.className)} style={{ aspectRatio: props.ar }} onLoad={() => setIsLoading(false)} />
      <div className={cn("absolute top-0 left-0 w-full h-full bg-[#eee] transition-all duration-300", isLoading ? "opacity-100 visible" : "opacity-0 invisible")} />
    </div>
  )
}