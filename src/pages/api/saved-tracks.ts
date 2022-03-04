import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { SavedTrackResponse, Track } from "../../model";
import { addSavedTrack, getSavedTracks, removeSavedTrack } from "../../spotify/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<SavedTrackResponse | undefined>) {
  const session = await getSession({ req });
  if (session === null) {
    console.log("No session");
    res.status(403).send(undefined);
    return;
  }
  const accessToken = session.token?.accessToken;
  if (accessToken === undefined) {
    console.log("No access token");
    res.status(403).send(undefined);
    return;
  }

  if (req.method === "GET") {
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
          uri: savedTrack.track.uri,
        };
      });

      res.status(200).json({ tracks });
    } catch (error) {
      console.error(error);
      res.status(500).send(undefined);
    }
    return;
  }

  if (req.method === "DELETE") {
    const body = JSON.parse(req.body);
    const { trackId } = body;

    if (typeof trackId !== "string") {
      console.log("trackUri is required");
      res.status(400).send(undefined);
      return;
    }

    try {
      const response = await removeSavedTrack(trackId, accessToken);
      console.log({ response });
      res.status(200).send(undefined);
    } catch (error) {
      console.error(error);
      res.status(500).send(undefined);
    }
    return;
  }

  if (req.method === "PUT") {
    const body = JSON.parse(req.body);
    const { trackId } = body;

    if (typeof trackId !== "string") {
      console.log("trackUri is required");
      res.status(400).send(undefined);
      return;
    }

    try {
      const response = await addSavedTrack(trackId, accessToken);
      console.log({ response });
      res.status(200).send(undefined);
    } catch (error) {
      console.error(error);
      res.status(500).send(undefined);
    }
    return;
  }

  // GET nor DELETE, PUT
  res.status(405).send(undefined);
}
