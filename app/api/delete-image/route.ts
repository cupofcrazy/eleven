import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 })
  }
  const folder = "pictures"
  const image = await cloudinary.api.delete_resources([`${folder}/${id}`])
  return NextResponse.json({ image })
}