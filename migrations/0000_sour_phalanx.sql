CREATE TABLE `albums2023` (
	`position` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`album_art_url` text NOT NULL,
	`wikipedia_summary` text,
	`wikipedia_url` text,
	`musicbrainz_url` text NOT NULL,
	`rateyourmusic_url` text
);
