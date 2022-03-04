import { useCallback } from "react";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { addTrackToPlaylist, getPlaylistTracks } from "../../../lib/client";
import { Track } from "../../../model";

export function usePlaylistTracks(playlistId: string): {
  playlistTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onAddTrack: (trackUri: string, position: number) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable(`playlists/${playlistId}`, () => getPlaylistTracks(playlistId));
  const onAddTrack = useCallback(
    async (trackUri: string, position: number) => {
      await addTrackToPlaylist(playlistId, trackUri, position);
      mutate(`playlists/${playlistId}`);
    },
    [mutate, playlistId]
  );

  return {
    playlistTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
    onAddTrack,
  };
}
