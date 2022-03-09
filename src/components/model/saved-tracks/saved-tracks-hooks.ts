import { useCallback, useMemo } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { addSavedTrack, getSavedTracks, removeSavedTrack } from "../../../lib/client";
import { Track } from "../../../model";

export function useSavedTracks(): {
  savedTracks: Track[] | undefined;
  loading: boolean;
  canReadMore: boolean;
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

  const loading = useMemo(() => {
    return data === undefined && error === undefined;
  }, [data, error]);

  // sizeは追加されているが、dataのsize番目に値がないときは追加読み込み中
  const readingMore = useMemo(() => {
    return size > 0 && data !== undefined && data.length > 0 && data[size - 1] === undefined;
  }, [data, size]);

  const canReadMore = useMemo(() => {
    return !readingMore && !loading && error === undefined && data !== undefined;
  }, [data, error, loading, readingMore]);

  return {
    savedTracks: data?.flatMap((it) => it.tracks),
    loading,
    canReadMore,
    error: error,
    onAdd,
    onRemove,
    readMore,
  };
}
