import useSWR from "swr";
import { getMyPlaylists, getSavedTracks, getPlaylistTracks } from "../../lib/client";
import { Track, Playlist } from "../../model";

export function useSavedTracks(): { savedTracks: Track[] | undefined; loading: boolean; error: Error | undefined } {
  const { data, error } = useSWR("saved-tracks", getSavedTracks);

  return {
    savedTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
  };
}

export function useMyPlaylists(): {
  myPlaylists: Playlist[] | undefined;
  loading: boolean;
  error: Error | undefined;
} {
  const { data, error } = useSWR("my-playlists", getMyPlaylists);

  return {
    myPlaylists: data?.playlists,
    loading: data === undefined && error === undefined,
    error: error,
  };
}

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
