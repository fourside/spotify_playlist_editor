import { useCallback } from "react";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { createPlaylist, getMyPlaylists } from "../../../lib/client";
import { Playlist } from "../../../model";

export function useMyPlaylists(): {
  myPlaylists: Playlist[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onCreatePlaylist: (name: string) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable("my-playlists", getMyPlaylists);

  const onCreatePlaylist = useCallback(
    async (name: string) => {
      await createPlaylist(name);
      mutate("my-playlists");
    },
    [mutate]
  );

  return {
    myPlaylists: data?.playlists,
    loading: data === undefined && error === undefined,
    error: error,
    onCreatePlaylist,
  };
}
