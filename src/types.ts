export type SpotifyResponse<T> = {
  href: string;
  items: T[];
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
  total: number;
};

export type SpotifySavedTrack = {
  added_at: string;
  track: SpotifyTrack;
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: {
    name: string;
  }[];
  duration_ms: number;
  id: string;
  name: string;
  popularity: number;
  type: "track";
};

export type SpotifyAlbum = {
  images: {
    url: string;
    height: number;
    width: number;
  }[];
};
