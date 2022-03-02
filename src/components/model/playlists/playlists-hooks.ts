import { useCallback } from "react";
import useSWR from "swr";
import { createPlaylist, getMyPlaylists } from "../../../lib/client";
import { Playlist } from "../../../model";

export function useMyPlaylists(): {
  myPlaylists: Playlist[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onCreatePlaylist: (name: string) => Promise<void>;
} {
  const { data, error, mutate } = useSWR("my-playlists", getMyPlaylists);

  const onCreatePlaylist = useCallback(
    async (name: string) => {
      const newPlaylist = await createPlaylist(name);
      mutate({ playlists: [...(data?.playlists ?? []), newPlaylist] }, false);
    },
    [data?.playlists, mutate]
  );

  return {
    myPlaylists: data?.playlists,
    loading: data === undefined && error === undefined,
    error: error,
    onCreatePlaylist,
  };
}
