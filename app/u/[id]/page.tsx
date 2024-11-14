import { addPostToBoard, deletePost, getPostById, getPostByIdWithUser, getPostsByUserId, getUserPosts } from "@/actions/post"
import { Image } from "@/components/image"
import { ArrowLeftIcon, DeleteIcon, PlusIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { DeleteButton } from "@/components/posts/delete-post"
import { redirect } from "next/navigation"
import { NEXT_PUBLIC_API_URL } from "@/utils/env"
import { AddPostToBoard } from "@/components/posts/add-post-to-board"
import { getUserById } from "@/actions/user"
import { PostGrid } from "@/components/posts/post-grid"

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  const userPosts = await getPostsByUserId(params.id)

  if (!user) {
    return <div>User not found</div>
  }

  return <div className="py-16 px-4 min-h-screen">
    <div className="flex flex-col items-center justify-center w-full">
      <Image src={user?.image || ''} alt={user.name || ''} width={300} height={300} className="rounded-full w-40 h-40 overflow-hidden" />
      <h1 className="text-2xl mt-4">{user.name}</h1>
      <p className="text-sm text-black/50">{user.email}</p>

      {/* <p>{JSON.stringify(userPosts, null, 2)}</p> */}

      <PostGrid posts={userPosts} />
    </div>
  </div>
}