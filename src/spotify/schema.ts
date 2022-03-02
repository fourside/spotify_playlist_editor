import { z } from "zod";
import { schemaForType } from "../lib/schema-for-type";
import {
  SpotifyAlbum,
  SpotifyPlaylist,
  SpotifyPlaylistTrack,
  SpotifyResponse,
  SpotifySavedTrack,
  SpotifyTrack,
} from "./model";

const spotifyAlbumJson = schemaForType<SpotifyAlbum>()(
  z.object({
    images: z.array(
      z.object({
        url: z.string(),
        height: z.number(),
        width: z.number(),
      })
    ),
  })
);

const spotifyTrackJson = schemaForType<SpotifyTrack>()(
  z.object({
    album: spotifyAlbumJson,
    artists: z.array(
      z.object({
        name: z.string(),
      })
    ),
    duration_ms: z.number(),
    id: z.string(),
    name: z.string(),
    popularity: z.number(),
    type: z.literal("track"),
  })
);

const spotifySavedTrackJson = schemaForType<SpotifySavedTrack>()(
  z.object({
    added_at: z.string(),
    track: spotifyTrackJson,
  })
);

export const spotifySavedTrackResponseJson = schemaForType<SpotifyResponse<SpotifySavedTrack>>()(
  z.object({
    href: z.string(),
    items: z.array(spotifySavedTrackJson),
    limit: z.number(),
    offset: z.number(),
    next: z.nullable(z.string()),
    previous: z.nullable(z.string()),
    total: z.number(),
  })
);

export const spotifyPlaylistJson = schemaForType<SpotifyPlaylist>()(
  z.object({
    id: z.string(),
    name: z.string(),
    owner: z.object({
      id: z.string(),
      display_name: z.string(),
    }),
  })
);

export const spotifyPlaylistResponseJson = schemaForType<SpotifyResponse<SpotifyPlaylist>>()(
  z.object({
    href: z.string(),
    items: z.array(spotifyPlaylistJson),
    limit: z.number(),
    offset: z.number(),
    next: z.nullable(z.string()),
    previous: z.nullable(z.string()),
    total: z.number(),
  })
);

export const spotifyPlaylistTrackResponseJson = schemaForType<SpotifyResponse<SpotifyPlaylistTrack>>()(
  z.object({
    href: z.string(),
    items: z.array(
      z.object({
        track: spotifyTrackJson,
      })
    ),
    limit: z.number(),
    offset: z.number(),
    next: z.nullable(z.string()),
    previous: z.nullable(z.string()),
    total: z.number(),
  })
);
