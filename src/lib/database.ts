import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

function initDbConnection() {
  if (process.env.NODE_ENV === 'development') {
    const { env } = getRequestContext()

    return drizzle((env as any).DB, { schema })
  }

  return drizzle(process.env.DB, { schema })
}

export const db = initDbConnection()
