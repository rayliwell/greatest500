import { extractAlbumData, getAlbumsFromMusicBrainzApi } from './data'
import { makeDatabase, writeAlbumDataToDatabase } from './database'
import { makeS3Client, writeAlbumArtToR2Endpoint } from './s3'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const dbClient = await makeDatabase()
const s3Client = await makeS3Client()

const albums = await getAlbumsFromMusicBrainzApi('bb3d9d84-75b8-4e67-8ad7-dcc38f764bf3')

let currentPosition = 1

for (let album of albums) {
  console.log('Starting album ' + currentPosition)
  const albumDetails = await extractAlbumData(album)
  const albumArtUrl = await writeAlbumArtToR2Endpoint(s3Client, albumDetails, currentPosition)
  await writeAlbumDataToDatabase(dbClient, albumDetails, albumArtUrl, currentPosition)

  console.log('Completed album ' + currentPosition)
  await sleep(500)
  currentPosition++
}
