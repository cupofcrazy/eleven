import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/me"
  ]
}

export async function middleware(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/", req.url))
  }
}