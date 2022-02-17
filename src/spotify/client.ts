import { readFileSync, writeFileSync } from "fs";
import { SpotifyPlaylist, SpotifyResponse, SpotifySavedTrack } from "./model";
import { spotifyPlaylistResponseJson, spotifySavedTrackResponseJson } from "./schema";

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

export async function getMyPlaylists(accessToken: string): Promise<SpotifyResponse<SpotifyPlaylist>> {
  if (process.env.NODE_ENV !== "production") {
    const file = readFileSync("./spotify-playlists.json", "utf-8");
    return spotifyPlaylistResponseJson.parse(JSON.parse(file));
  }
  const response = await fetch(`${baseUrl}/me/playlists`, {
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
  return spotifyPlaylistResponseJson.parse(json);
}
