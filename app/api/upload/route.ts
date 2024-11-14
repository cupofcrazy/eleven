import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse} from "cloudinary";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized access to upload" }, { status: 401 })
  }
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        folder: "pictures",
      }, (error, result) => {
        if (error) reject(error)
        resolve(result as UploadApiResponse)
      }).end(buffer)
    }) as UploadApiResponse

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}