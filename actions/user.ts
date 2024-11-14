"use server"

import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getUserById(id: string) {
  const user = await db.select().from(users).where(eq(users.id, id))
  return user[0]
}