'use client'

import Link from "next/link"
import { MasonryGrid } from "../masonry-grid"
import Image from "next/image"

interface Props {
  posts: any[]
}

export function PostMasonryGrid({ posts }: Props) {
  return (
    <MasonryGrid >
        {posts.map((post) => (
          <Link href={`/p/${post.id}`} className="w-full h-full flex flex-col gap-2 justify-center items-center p-0 hover:bg-black/5 transition-colors duration-300 rounded-2xl overflow-hidden border border-black/5" key={post.id}>
            <Image className="" src={post.url} alt={post.caption || ""} width={800} height={800} />
            {/* <p className="text-sm text-black/60">{post.caption}</p> */}
          </Link>
        ))}
      </MasonryGrid>
  )
}