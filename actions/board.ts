'use server'

import z from "zod";
import { db } from "@/db/client";
import { boards, posts } from "@/db/schema";
import { BoardSchemaType } from "@/lib/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function createBoard(data: BoardSchemaType) {
  const session = await auth()
  if (!session?.user?.id) {
    console.error('No session')
    return
  }
  await db.insert(boards).values({
    ...data,
    userId: session.user.id,
  })

  revalidatePath('/')
}

export async function getUserBoards() {
  const session = await auth()
  if (!session?.user?.id) {
    console.error('No session')
    return
  }

  // get all users boards and
  const userBoards = await db.select().from(boards).where(eq(boards.userId, session.user.id))
  return userBoards
}

