import Image from "next/image";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/sign-out";
import { UploadForm } from "@/components/upload-form";
import { getAllPosts } from "@/actions/post";
import Link from "next/link";
import { MasonryGrid } from "@/components/masonry-grid";
import { PostGrid } from "@/components/posts/post-grid";

export default async function Home() {
  const session = await auth()
  const {posts, nextPage} = await getAllPosts()
  const postCount = posts.length

  return (
    <div className="p-4 pt-16 pb-24">
      {/* <p>Welcome {session?.user?.name}</p> */}
      <PostGrid posts={posts} />
    </div>
  );
}
