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
};
