'use server'

import { signIn as signInWithAuth, auth } from "@/auth"
import { createBoard } from "./board"
import { db } from "@/db/client"
import { boards } from "@/db/schema"
import { eq } from "drizzle-orm"
import { DEFAULT_BOARD_NAME } from "@/utils/constants"
import { redirect } from "next/navigation"

export async function signIn() {
  await signInWithAuth("google")
}