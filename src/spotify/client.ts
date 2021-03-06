import { SpotifyPlaylist, SpotifyPlaylistTrack, SpotifyResponse, SpotifySavedTrack, SpotifyTrack } from "./model";
import {
  spotifyPlaylistJson,
  spotifyPlaylistResponseJson,
  spotifyPlaylistTrackResponseJson,
  spotifySavedTrackResponseJson,
} from "./schema";

const baseUrl = "https://api.spotify.com/v1";

type Request = (request: {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  accessToken: string;
  body?: unknown;
  headers?: Record<string, string>;
  init?: Omit<RequestInit, "headers" | "method" | "body">;
}) => Promise<Response>;

const fetcher: Request = async ({ method = "GET", url, accessToken, body, headers, init }) => {
  return await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init,
  });
};

export async function getSavedTracks(accessToken: string, offset: number): Promise<SpotifyResponse<SpotifySavedTrack>> {
  const response = await fetcher({ url: `/me/tracks?offset=${offset}`, accessToken });
  const json = await response.json();
  if (!response.ok) {
    console.error("spotify getSavedTrack is not ok:", json);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return spotifySavedTrackResponseJson.parse(json);
}

export async function getMyPlaylists(accessToken: string): Promise<SpotifyResponse<SpotifyPlaylist>> {
  const response = await fetcher({ url: "/me/playlists?limit=50", accessToken });
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
  const response = await fetcher({ url: `/playlists/${playlistId}/tracks`, accessToken });
  const json = await response.json();
  if (!response.ok) {
    console.error("spotify getSavedTrack is not ok:", json);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return spotifyPlaylistTrackResponseJson.parse(json);
}

export async function createPlaylist(name: string, userId: string, accessToken: string): Promise<SpotifyPlaylist> {
  const response = await fetcher({ method: "POST", url: `/users/${userId}/playlists`, accessToken, body: { name } });
  const json = await response.json();
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
  const response = await fetcher({
    method: "POST",
    url: `/playlists/${playlistId}/tracks`,
    accessToken,
    body: { uris: [trackUri], position },
  });
  if (!response.ok) {
    console.error("spotify addTrackToPlaylist is not ok:", response);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function removeTrackFromPlaylist(
  playlistId: string,
  trackUri: string,
  accessToken: string
): Promise<unknown> {
  const response = await fetcher({
    method: "DELETE",
    url: `/playlists/${playlistId}/tracks`,
    accessToken,
    body: { uris: [trackUri] },
  });
  if (!response.ok) {
    console.error("spotify removeTrackFromPlaylist is not ok:", response);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function removeSavedTrack(trackId: SpotifyTrack["id"], accessToken: string): Promise<unknown> {
  const response = await fetcher({ method: "DELETE", url: `/me/tracks`, accessToken, body: { ids: [trackId] } });
  if (!response.ok) {
    console.error("spotify removeSavedTrack is not ok:", response);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.text();
}

export async function addSavedTrack(trackId: SpotifyTrack["id"], accessToken: string): Promise<unknown> {
  const response = await fetcher({ method: "PUT", url: `/me/tracks`, accessToken, body: { ids: [trackId] } });
  if (!response.ok) {
    console.error("spotify addSavedTrack is not ok:", response);
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.text();
}
