import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Playlist, PlaylistsResponse } from "../../model";
import { getMyPlaylists } from "../../spotify/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<PlaylistsResponse | undefined>) {
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
  const myName = session.user?.name;
  try {
    const parsed = await getMyPlaylists(accessToken);
    const playlists = parsed.items
      .filter((playlist) => playlist.owner.display_name === myName)
      .map<Playlist>((playlist) => {
        return {
          id: playlist.id,
          name: playlist.name,
        };
      });

    res.status(200).json({ playlists });
  } catch (error) {
    console.error(error);
    res.status(500).send(undefined);
  }
}
