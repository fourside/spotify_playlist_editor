import { z } from "zod";
import { schemaForType } from "./lib/schema-for-type";
import { Playlist, PlaylistsResponse, PlaylistTrackResponse, SavedTrackResponse, Track } from "./model";

const trackJson = schemaForType<Track>()(
  z.object({
    id: z.string(),
    name: z.string(),
    artistName: z.string(),
    albumImageUrl: z.string(),
    durationMs: z.number(),
    popularity: z.number(),
    uri: z.string(),
  })
);

export const savedTrackResponseJson = schemaForType<SavedTrackResponse>()(
  z.object({
    tracks: z.array(trackJson),
  })
);

export const playlistJson = schemaForType<Playlist>()(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const myPlaylistsResponseJson = schemaForType<PlaylistsResponse>()(
  z.object({
    playlists: z.array(playlistJson),
  })
);

export const playlistTrackResponseJson = schemaForType<PlaylistTrackResponse>()(
  z.object({
    tracks: z.array(trackJson),
  })
);
