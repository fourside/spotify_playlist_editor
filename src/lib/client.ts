import { PlaylistResponse, PlaylistTrackResponse, SavedTrackResponse } from "../model";
import { myPlaylistsResponseJson, playlistTrackResponseJson, savedTrackResponseJson } from "../schema";

export async function getSavedTracks(): Promise<SavedTrackResponse> {
  const response = await fetch(`/api/saved-tracks`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`response is not ok: status=${response.status}`);
  }
  const json = await response.json();
  return savedTrackResponseJson.parse(json);
}

export async function getMyPlaylists(): Promise<PlaylistResponse> {
  const response = await fetch(`/api/my-playlists`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`response is not ok: status=${response.status}`);
  }
  const json = await response.json();
  return myPlaylistsResponseJson.parse(json);
}

export async function getPlaylistTracks(playlistId: string): Promise<PlaylistTrackResponse> {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`response is not ok: status=${response.status}`);
  }
  const json = await response.json();
  return playlistTrackResponseJson.parse(json);
}
