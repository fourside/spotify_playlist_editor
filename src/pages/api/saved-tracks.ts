import type { NextApiRequest, NextApiResponse } from "next";
import { SavedTrackResponse, Track } from "../../model";
import { getSavedTracks } from "../../spotify/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<SavedTrackResponse | undefined>) {
  const cookie = req.headers.cookie;
  if (cookie === undefined) {
    console.log("No cookie");
    res.status(403).send(undefined);
    return;
  }
  const accessTokenKeyValue = cookie.split("; ").find((cookie) => cookie.startsWith("access_token="));
  if (accessTokenKeyValue === undefined) {
    console.log("No access token key value");
    res.status(403).send(undefined);
    return;
  }
  const accessToken = accessTokenKeyValue.split("=")[1];

  try {
    const parsed = await getSavedTracks(accessToken);
    const tracks = parsed.items.map<Track>((savedTrack) => {
      return {
        id: savedTrack.track.id,
        name: savedTrack.track.name,
        popularity: savedTrack.track.popularity,
        durationMs: savedTrack.track.duration_ms,
        artistName: savedTrack.track.artists[0].name,
        albumImageUrl: savedTrack.track.album.images[0].url,
      };
    });

    res.status(200).json({ tracks });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
