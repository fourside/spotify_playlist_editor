import { readFileSync } from "fs";
import { SpotifyResponse, SpotifySavedTrack } from "./model";
import { spotifySavedTrackResponseJson } from "./schema";

const baseUrl = "https://api.spotify.com/v1";

export async function getSavedTracks(accessToken: string): Promise<SpotifyResponse<SpotifySavedTrack>> {
  if (process.env.NODE_ENV !== "production") {
    const file = readFileSync("./spotify-saved-tracks.json", "utf-8");
    return spotifySavedTrackResponseJson.parse(JSON.parse(file));
  }
  const response = await fetch(`${baseUrl}/me/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  const json = await response.json();
  if (!response.ok) {
    console.error("spotify getSavedTrack is not ok:", json);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return spotifySavedTrackResponseJson.parse(json);
}
