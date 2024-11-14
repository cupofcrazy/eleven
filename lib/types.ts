import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { boards, posts, users } from "@/db/schema";

export const UserSchema = createInsertSchema(users)
export const PostSchema = createInsertSchema(posts)

export const BoardSchema = createInsertSchema(boards)

export type BoardSchemaType = z.infer<typeof BoardSchema>
export type PostSchemaType = z.infer<typeof PostSchema>
export type UserSchemaType = z.infer<typeof UserSchema>


