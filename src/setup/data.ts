export async function extractAlbumData(album: any) {
  let albumJson = await getAlbumDataFromMusicBrainzApi(album.release_group.id)
  let wikidata = albumJson.relations.find((d: any) => d.type === 'wikidata')

  let albumTitle = album.release_group.title as string
  let artistName = albumJson['artist-credit'][0].name as string
  let musicBrainzUrl = `https://musicbrainz.org/release-group/${album.release_group.id}`
  let wikipediaUrl =
    wikidata && ((await getWikipediaUrlFromWikidataUrl(wikidata.url.resource)) as string)
  let wikipediaSummary = wikidata && ((await getWikipediaArticleSummary(wikipediaUrl)) as string)
  let rateYourMusicUrl = await getRateYourMusicUrlFromAlbumJSON(albumJson)
  let albumArtData = await getImageDataFromUrl(
    `https://coverartarchive.org/release-group/${albumJson.id}/front-500`
  )

  let albumDetails = {
    title: albumTitle,
    artist: artistName,
    wikipediaUrl,
    wikipediaSummary,
    musicBrainzUrl,
    rateYourMusicUrl,
  }

  return { art: albumArtData, details: albumDetails }
}

export async function getAlbumsFromMusicBrainzApi(musicBrainzId: string) {
  let listJson = await readJsonFromApi(
    `https://musicbrainz.org/ws/2/series/${musicBrainzId}?fmt=json&inc=release-group-rels`
  )

  return listJson.relations.sort((a1: any, a2: any) => a1['ordering-key'] - a2['ordering-key'])
}

async function getAlbumDataFromMusicBrainzApi(albumId: string) {
  return await readJsonFromApi(
    'https://musicbrainz.org/ws/2/release-group/' +
      albumId +
      '?fmt=json&inc=artist-credits+url-rels'
  )
}

async function getRateYourMusicUrlFromAlbumJSON(album: any) {
  return album.relations?.find((rel: any) => rel.url?.resource?.includes('rateyourmusic.com'))?.url
    .resource
}

async function getWikipediaUrlFromWikidataUrl(wikimediaUrl: string) {
  let wikimediaId = wikimediaUrl.split('/').pop()
  let wikimediaJson = await readJsonFromApi(
    'https://wikidata.org/w/rest.php/wikibase/v0/entities/items/' + wikimediaId + '/sitelinks'
  )

  return wikimediaJson?.enwiki.url
}

async function getWikipediaArticleSummary(wikipediaUrl: string) {
  let wikipediaPageName = wikipediaUrl.split('wiki/').pop()
  let wikipediaJson = await readJsonFromApi(
    'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' +
      wikipediaPageName
  )

  return (Object.values(wikipediaJson?.query?.pages)[0] as any)?.extract
}

async function getImageDataFromUrl(imageUrl: string) {
  let response = await fetch(imageUrl, { method: 'GET', redirect: 'follow' })
  let blob = await response.blob()
  return { buffer: Buffer.from(await blob.arrayBuffer()), type: blob.type }
}

async function readJsonFromApi(query: string) {
  let response = await fetch(query, {
    method: 'GET',
    headers: {
      'User-Agent': 'Greatest500Albums/0.1 (https://greatest500.rayliwell.com/)',
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

export type AlbumData = Awaited<ReturnType<typeof extractAlbumData>>
