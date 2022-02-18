import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PlaylistTrackResponse, Track } from "../../../model";
import { getPlaylistTracks } from "../../../spotify/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<PlaylistTrackResponse | undefined>) {
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
    const { id } = req.query;
    const playlistId = Array.isArray(id) ? id[0] : id;

    try {
      const parsed = await getPlaylistTracks(playlistId, accessToken);
      const tracks = parsed.items.map<Track>((playlistTrack) => {
        return {
          id: playlistTrack.track.id,
          name: playlistTrack.track.name,
          artistName: playlistTrack.track.artists[0].name,
          albumImageUrl: playlistTrack.track.album.images[0].url,
          durationMs: playlistTrack.track.duration_ms,
          popularity: playlistTrack.track.popularity,
        };
      });

      res.status(200).json({ tracks });
    } catch (error) {
      console.error(error);
      res.status(500).send(undefined);
    }
  }

  if (req.method !== "GET") {
    res.status(405).send(undefined);
  }
}
