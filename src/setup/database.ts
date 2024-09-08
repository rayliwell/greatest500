import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from '../lib/schema'
import { albums } from '../lib/schema'
import type { AlbumData } from './data'

export async function makeDatabase() {
  return drizzle(
    async (sql, params, method) => {
      const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params, method }),
      })

      const data = await res.json()
      const result = data.result[0]

      return { rows: result.results.map((r: any) => Object.values(r)) }
    },
    { schema }
  )
}

export type Database = Awaited<ReturnType<typeof makeDatabase>>

export async function writeAlbumDataToDatabase(
  database: Database,
  albumData: AlbumData,
  albumArtUrl: string,
  position: number
) {
  await database
    .insert(albums)
    .values({ ...albumData.details, albumArtUrl, position })
    .run()
}
