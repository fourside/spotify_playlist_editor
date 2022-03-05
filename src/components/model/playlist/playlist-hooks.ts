import { useCallback } from "react";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { addTrackToPlaylist, getPlaylistTracks, removeTrackFromPlaylist } from "../../../lib/client";
import { Track } from "../../../model";

export function usePlaylistTracks(playlistId: string): {
  playlistTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onAdd: (track: Track, position: number) => Promise<void>;
  onRemove: (track: Track) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable(`playlists/${playlistId}`, () => getPlaylistTracks(playlistId));

  const onAdd = useCallback(
    async (track: Track, position: number) => {
      await addTrackToPlaylist(playlistId, track.uri, position);
      mutate(`playlists/${playlistId}`);
    },
    [mutate, playlistId]
  );

  const onRemove = useCallback(
    async (track: Track) => {
      await removeTrackFromPlaylist(playlistId, track.uri);
      mutate(`playlists/${playlistId}`);
    },
    [mutate, playlistId]
  );

  return {
    playlistTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
    onAdd,
    onRemove,
  };
}
