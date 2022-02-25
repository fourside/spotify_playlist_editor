import useSWR from "swr";
import { getPlaylistTracks } from "../../lib/client";
import { Track } from "../../model";

export function usePlaylistTracks(playlistId: string): {
  playlistTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
} {
  const { data, error } = useSWR(`playlists/${playlistId}`, () => getPlaylistTracks(playlistId));

  return {
    playlistTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
  };
}
