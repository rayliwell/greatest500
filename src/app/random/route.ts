import { redirect } from 'next/navigation'

export async function GET() {
  let randomPosition = Math.floor(Math.random() * (500 - 1 + 1) + 1)

  redirect(`/album/2023/${randomPosition}`)
}
