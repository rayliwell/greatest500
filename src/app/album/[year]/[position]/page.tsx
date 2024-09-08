import { redirect } from 'next/navigation'

import Album from '../../../../components/Album'
import Arrow from '../../../../components/Arrow'
import getAlbum from '../../../../utils/getAlbum'

interface AlbumParams {
  position: string
  year: string
}

export async function generateMetadata({ params }: { params: AlbumParams }) {
  let album = await getAlbum(params.year, params.position)
  if (!album) return {}

  return {
    title: `#${album.position} - ${album.title} - 2023 - Greatest500`,
    description: `${album.title} by ${album.artist}`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  }
}

export default async function AlbumPage({ params }: { params: AlbumParams }) {
  let album = await getAlbum(params.year, params.position)
  if (!album) redirect('/')

  return (
    <main className='grid grid-rows-[repeat(2,auto)] grid-cols-[repeat(2,auto)] md:flex flex-col justify-evenly grow   mx-auto container px-4'>
      <Arrow direction='up' position={album.position} />
      <Album album={album} />
      <Arrow direction='down' position={album.position} />
    </main>
  )
}
