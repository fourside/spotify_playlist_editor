export type SavedTrackResponse = {
  tracks: Track[];
};

export type Track = {
  id: string;
  name: string;
  artistName: string;
  albumImageUrl: string;
  durationMs: number;
  popularity: number;
  uri: string;
};

export type PlaylistResponse = {
  playlists: Playlist[];
};

export type Playlist = {
  id: string;
  name: string;
};

export type PlaylistTrackResponse = {
  tracks: Track[];
};
