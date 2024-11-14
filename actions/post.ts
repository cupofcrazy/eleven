"use server"

import { auth } from "@/auth"
import { db } from "@/db/client"
import { posts, boards, users, boardPosts } from "@/db/schema"
import { PostSchemaType } from "@/lib/types"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function addNewPost(data: PostSchemaType) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not logged in")
  }
  await db.insert(posts).values({
    caption: data.caption,
    url: data.url,
    boardId: data.boardId,
    userId: session.user.id,
    width: data.width,
    height: data.height,
    format: data.format,
    size: data.size,
    assetId: data.assetId,
  })
  revalidatePath('/')
}

export async function getAllPosts(page: number = 0, limit: number = 50) {
  const offset = page * limit
  // get all posts from the database by descending order
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(limit).offset(offset)

  return {
    posts: allPosts,
    nextPage: allPosts.length === limit ? page + 1 : null
  }
}

export async function getUserPosts() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("User not logged in")
  }
  const userPosts = await db.select().from(posts).where(eq(posts.userId, session.user.id)).orderBy(desc(posts.createdAt))
  return userPosts
}

export async function getPostById(id: string) {
  const post = await db.select().from(posts).where(eq(posts.id, id))
  return post[0]
}

export async function getPostByIdWithUser(id: string) {
  const post = await db.select({
    post: posts,
    user: users,
  }).from(posts).innerJoin(users, eq(posts.userId, users.id)).where(eq(posts.id, id))
  return post[0]
}

export async function deletePost(id: string) {
  await db.delete(posts).where(eq(posts.id, id))
}

export async function addPostToBoard(postId: string, boardId?: string | null) {
  if (!boardId) {
    await db.update(posts).set({ boardId: null }).where(eq(posts.id, postId))
  } else {
    const doesPostExistInBoard = await db.select().from(boardPosts).where(and(eq(boardPosts.boardId, boardId), eq(boardPosts.postId, postId)))

    if (doesPostExistInBoard.length > 0) {
      throw new Error("Post already in board")
    }
    await db.update(posts).set({ boardId }).where(eq(posts.id, postId))
    await db.insert(boardPosts).values({
      boardId,
      postId,
    })
  }
}

export const isPostInUsersBoards = async (postId: string) => {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("User not logged in")
  }
  const uBoards = await db.select().from(boards).where(eq(boards.userId, session.user.id))
  const bPosts = await db.select().from(boardPosts).where(eq(boardPosts.boardId, uBoards[0].id))
  return bPosts.length
}

export const getPostsByUserId = async (userId: string) => {
  const userPosts = await db.select().from(posts).where(eq(posts.userId, userId))
  return userPosts
}

export const getUserBoardWithPostStatus = async (postId: string) => {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("User not logged in")
  }
  const userBoards = await db.select({
    id: boards.id,
    name: boards.name,
    description: boards.description,
    hasPost: db
      .select({exists: true })
      .from(boardPosts)
      .where(and(eq(boardPosts.boardId, boards.id), eq(boardPosts.postId, postId)))
      .limit(1)
      .$exists()
  })
  .from(boards)
  .where(eq(boards.userId, session.user.id))
}