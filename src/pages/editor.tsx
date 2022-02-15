import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Track } from "./api/saved-tracks";
import { savedTrackResponseJson } from "../shcema";

const Editor: NextPage = () => {
  const { savedTracks, loading } = useSpotify();

  return (
    <div>
      <h1>Editor</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        savedTracks.map((track, index) => (
          <div key={index}>
            <div>
              {track.name} by {track.artistName}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Editor;

function useSpotify(): { savedTracks: Track[]; loading: boolean } {
  const [loading, setLoading] = useState(true);
  const [savedTracks, setSavedTracks] = useState<Track[]>([]);

  const getSavedTracks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/saved-tracks`, {
        credentials: "include",
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error("response is not ok");
      }
      return savedTrackResponseJson.parse(json);
    } catch (error) {
      console.error(error);
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const savedTracks = await getSavedTracks();
        if (savedTracks === undefined) {
          return;
        }
        setSavedTracks(savedTracks.tracks);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getSavedTracks]);

  return {
    savedTracks,
    loading,
  };
}
