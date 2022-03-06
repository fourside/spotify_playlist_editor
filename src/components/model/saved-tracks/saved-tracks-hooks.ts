import { useCallback } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { addSavedTrack, getSavedTracks, removeSavedTrack } from "../../../lib/client";
import { Track } from "../../../model";

export function useSavedTracks(): {
  savedTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onAdd: (track: Track) => Promise<void>;
  onRemove: (track: Track) => Promise<void>;
  readMore: () => void;
} {
  const getKey: SWRInfiniteKeyLoader = (pageIndex, prevPageData) => {
    if (prevPageData !== null && prevPageData.length === 0) {
      return null;
    }
    return [`saved-tracks?offset=${pageIndex * 20}`, pageIndex * 20];
  };
  const { data, error, size, setSize, mutate } = useSWRInfinite(getKey, getSavedTracks, { revalidateFirstPage: false });

  const onAdd = useCallback(
    async (track: Track) => {
      await addSavedTrack(track.id);
      mutate();
    },
    [mutate]
  );

  const onRemove = useCallback(
    async (track: Track) => {
      await removeSavedTrack(track.id);
      mutate();
    },
    [mutate]
  );

  const readMore = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  return {
    savedTracks: data?.flatMap((it) => it.tracks),
    loading: data === undefined && error === undefined,
    error: error,
    onAdd,
    onRemove,
    readMore,
  };
}
