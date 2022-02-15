import { z } from "zod";
import { SavedTrackResponse, Track } from "./pages/api/saved-tracks";
import { SpotifyAlbum, SpotifySavedTrack, SpotifyResponse, SpotifyTrack } from "./types";

const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

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

const trackJson = schemaForType<Track>()(
  z.object({
    id: z.string(),
    name: z.string(),
    artistName: z.string(),
    albumImageUrl: z.string(),
    durationMs: z.number(),
    popularity: z.number(),
  })
);

export const savedTrackResponseJson = schemaForType<SavedTrackResponse>()(
  z.object({
    tracks: z.array(trackJson),
  })
);
