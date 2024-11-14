import { getUserBoards } from "@/actions/board"
import { getUserPosts } from "@/actions/post"
import { PostGrid } from "@/components/posts/post-grid"
import { PostMasonryGrid } from "@/components/posts/post-masonry"
import Image from "next/image"

export default async function UserPage() {
  const myPosts = await getUserPosts()
  const myBoards = await getUserBoards()

  return <div className="p-4 pt-16">
    <h1 className="text-3xl text-center mb-8">Your Images</h1>
    <p>You have {myPosts.length} images and {myBoards?.[1]?.name || 0} boards</p>
    <PostGrid posts={myPosts} />
  </div>
}