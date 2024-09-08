import { eq } from 'drizzle-orm'
import { albums } from '../lib/schema'
import { db } from '../lib/database'
import { cache } from 'react'

export default cache(async (yearString: string, positionString: string) => {
  let position = validateNumberBetweenTwoValues(positionString, 1, 500)
  if (yearString !== '2023' || position === undefined) return undefined

  return (await db.select().from(albums).where(eq(albums.position, position)))[0]
})

function validateNumberBetweenTwoValues(str: string, small: number, large: number) {
  if (!Array.from(str).every((c) => c >= '0' && c <= '9') || str.startsWith('0')) return
  let num = parseInt(str, 10)
  if (num < small || num > large) return
  return num
}
