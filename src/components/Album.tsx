import { albums } from '../lib/schema'
import { type InferSelectModel } from 'drizzle-orm'

import Logo from './Logo'

export default function Album({ album }: { album: InferSelectModel<typeof albums> }) {
  let {
    position,
    title,
    albumArtUrl,
    rateYourMusicUrl,
    wikipediaUrl,
    musicBrainzUrl,
    wikipediaSummary,
    artist,
  } = album

  return (
    <div className='grid grid-rows-[auto_auto_auto_1ft] md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto_1fr] gap-4 w-full md:h-72 lg:h-96 items-stretch row-start-2 col-span-2'>
      <img
        alt='Album cover'
        src={albumArtUrl}
        className='text-transparent md:row-span-3 md:col-span-1 rounded-lg md:h-72 md:w-72 lg:h-96 lg:w-96 object-contain w-full'
      />
      <div className='flex flex-col items-center text-center md:text-left md:items-start gap-2 grow row-start-1 md:row-start-auto'>
        <span className='text-sky-500 text-lg font-black uppercase'>{artist}</span>
        <h1 className='text-2xl text-center font-black'>
          #{position} {title}
        </h1>
      </div>
      <div className='flex gap-2'>
        {musicBrainzUrl && (
          <Logo name='MusicBrainz' src='/logos/musicbrainz.svg' href={musicBrainzUrl} />
        )}
        {wikipediaUrl && <Logo name='Wikipedia' src='/logos/wikipedia.svg' href={wikipediaUrl} />}
        {rateYourMusicUrl && (
          <Logo name='Rate your music' src='/logos/rateyourmusic.svg' href={rateYourMusicUrl} />
        )}
      </div>
      {wikipediaSummary && <div className='overflow-y-scroll'>{wikipediaSummary}</div>}
    </div>
  )
}
