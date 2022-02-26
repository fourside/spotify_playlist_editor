import useSWR from "swr";
import { getMyPlaylists } from "../../../lib/client";
import { Playlist } from "../../../model";

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
