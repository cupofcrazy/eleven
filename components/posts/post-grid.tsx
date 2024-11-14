import Link from "next/link"
import { Image } from "../image"

interface Props {
  posts: any[]
}

export function PostGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mt-4 w-full">
      {posts.map((post) => (
        <Link href={`/p/${post.id}`} className="w-full h-full flex flex-col gap-2 justify-center items-center p-12 hover:bg-black/5 transition-colors duration-300" key={post.id}>
          <Image className="w-2/3" src={post.url} alt={post.caption || ""} width={800} height={800} ar={post.width / post.height} />
          {/* <p className="text-sm text-black/60">{post.caption}</p> */}
        </Link>
      ))}
    </div>
)
}