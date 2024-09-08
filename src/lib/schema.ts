import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const albums = sqliteTable('albums2023', {
  position: integer('position').notNull().primaryKey(),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  albumArtUrl: text('album_art_url').notNull(),
  wikipediaSummary: text('wikipedia_summary'),
  wikipediaUrl: text('wikipedia_url'),
  musicBrainzUrl: text('musicbrainz_url').notNull(),
  rateYourMusicUrl: text('rateyourmusic_url'),
})
