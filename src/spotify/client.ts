import { readFileSync, writeFileSync } from "fs";
import { SpotifyPlaylist, SpotifyPlaylistTrack, SpotifyResponse, SpotifySavedTrack } from "./model";
import {
  spotifyPlaylistJson,
  spotifyPlaylistResponseJson,
  spotifyPlaylistTrackResponseJson,
  spotifySavedTrackResponseJson,
} from "./schema";

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

export async function getPlaylistTracks(
  playlistId: string,
  accessToken: string
): Promise<SpotifyResponse<SpotifyPlaylistTrack>> {
  const response = await fetch(`${baseUrl}/playlists/${playlistId}/tracks`, {
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
  return spotifyPlaylistTrackResponseJson.parse(json);
}

export async function createPlaylist(name: string, userId: string, accessToken: string): Promise<SpotifyPlaylist> {
  const response = await fetch(`${baseUrl}/users/${userId}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
  const json = await response.json();
  writeFileSync(`./spotify-create-playlist-[${json.id}].json`, JSON.stringify(json, null, 2));
  if (!response.ok) {
    console.error("spotify createPlaylist is not ok:", json);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return spotifyPlaylistJson.parse(json);
}

export async function addTrackToPlaylist(
  playlistId: string,
  trackUri: string,
  position: number,
  accessToken: string
): Promise<unknown> {
  const response = await fetch(`${baseUrl}/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      uris: [trackUri],
      position,
    }),
  });
  if (!response.ok) {
    console.error("spotify addTrackToPlaylist is not ok:", response);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}
