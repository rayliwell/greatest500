import { Client } from 'minio'

import type { AlbumData } from './data'

import { extension } from 'mime-types'

export async function makeS3Client() {
  return new Client({
    endPoint: `${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
    useSSL: true,
    accessKey: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  })
}

export type S3Client = Awaited<ReturnType<typeof makeS3Client>>

export async function writeAlbumArtToR2Endpoint(
  client: S3Client,
  albumData: AlbumData,
  position: number
) {
  let fileName = `albums/${position}.${extension(albumData.art.type)}`

  await client.putObject(process.env.CLOUDFLARE_R2_BUCKET_NAME!, fileName, albumData.art.buffer)

  return `${process.env.CLOUDFLARE_R2_PUBLIC_URL!}/${fileName}`
}
