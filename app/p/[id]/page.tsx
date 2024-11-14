import { addPostToBoard, deletePost, getPostById, getPostByIdWithUser, isPostInUsersBoards } from "@/actions/post"
import { Image } from "@/components/image"
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { DeleteButton } from "@/components/posts/delete-post"
import { notFound, redirect } from "next/navigation"
import { NEXT_PUBLIC_API_URL } from "@/utils/env"
import { AddPostToBoard } from "@/components/posts/add-post-to-board"
import { getUserBoards } from "@/actions/board"
import { auth } from "@/auth"

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await auth()
  const { post, user } = await getPostByIdWithUser(params.id)

  if (!post) {
    return notFound()
  }

  const isCurrentUserPost = user.id === session?.user?.id
  const boards = await getUserBoards()

  const { width, height } = post
  const aspectRatio = width && height ? width / height : 1

  return <div className="absolute p-4 w-full flex items-center justify-center min-h-screen z-index-[30] bg-white/100">
    <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <Link href="/" className="w-8 h-8 flex items-center justify-center">
          <ArrowLeftIcon className="w-5 h-5 text-black/50" />
        </Link>
        <div className="flex flex-col">
          <Avatar className="w-8 h-8" src={user.image || ""} alt={user.name || ""}  />
        </div>
      </div>
      <p className="text-black/50 px-3 py-0.5 rounded-full bg-white/50 border border-black/10">{post.caption}</p>
      <div className="flex items-center gap-2">
        <AddPostToBoard postId={post.id} boards={boards || []}>
          <button className="w-8 h-8 flex items-center justify-center">
            <PlusIcon className="w-5 h-5 text-black/50" />
          </button>
        </AddPostToBoard>
        {isCurrentUserPost && <DeleteButton onDelete={async () => {
          "use server"
          if (!isCurrentUserPost) {
            throw new Error("You cannot delete this post")
          }
          const deleted = await fetch(`${NEXT_PUBLIC_API_URL}/api/delete-image?id=${post.assetId}`, {
            method: "DELETE"
          })
          if (deleted.ok) {
            const data = await deleted.json()
            console.log({ data })
            await deletePost(post.id)
            redirect("/")
          }
        }}>
          <TrashIcon className="w-5 h-5 text-black/50" />
        </DeleteButton>}
      </div>
    </header>
    <Image 
      className="max-w-[360px]"
      src={post.url}
      alt={post.caption || ""}
      width={width || 800}
      height={height || 800}
      ar={aspectRatio}
    />
    <footer className="absolute bottom-4 left-4 z-[50]">
      <p className="text-sm text-black/100">
        {post.caption}
      </p>
      {/* <p>{isInUsersBoards ? "In Users Boards" : "Not in Users Boards"}</p> */}
      <p>Source: Unavailable</p>
      <p>by <Link className="underline" href={`/u/${user.id}`}>{user.name}</Link></p>
    </footer>
  </div>
}