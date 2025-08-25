import { connectToDB } from "@/lib/mongoDB"
import User from "@/models/User"
import { NextRequest } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  try {
    await connectToDB()

    const { email } = await params

    const user = await User.findOne({ email })

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err: any) {
    console.error(err)
    return new Response(`Failed to get user: ${err.message}`, { status: 500 })
  }
}

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  try {
    await connectToDB()

    const { email } = await params

    const user = await User.findOne({ email })

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    const { movieId } = await req.json()

    const isFavorite = user.favorites.includes(movieId)

    if (isFavorite) {
      user.favorites = user.favorites.filter((id: number) => id !== movieId)
    } else {
      user.favorites.push(movieId)
    }

    await user.save()

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err: any) {
    console.error(err)
    return new Response(`Failed to update user: ${err.message}`, { status: 500 })
  }
}
