import { Playlist, PlaylistResponse, PlaylistTrackResponse, SavedTrackResponse } from "../model";
import { myPlaylistsResponseJson, playlistJson, playlistTrackResponseJson, savedTrackResponseJson } from "../schema";

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

export async function createPlaylist(name: string): Promise<Playlist> {
  const response = await fetch("/api/playlists", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
  if (!response.ok) {
    throw new Error(`response is not ok: status=${response.status}`);
  }
  const json = await response.json();
  return playlistJson.parse(json);
}

export async function addTrackToPlaylist(playlistId: string, trackUri: string, position: number): Promise<void> {
  const response = await fetch(`/api/playlists/${playlistId}/tracks`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      trackUri,
      position,
    }),
  });
  if (!response.ok) {
    throw new Error(`response is not ok: status=${response.status}`);
  }
}

export async function removeSavedTrack(trackId: string): Promise<void> {
  const response = await fetch("/api/saved-tracks", {
    credentials: "include",
    method: "DELETE",
    body: JSON.stringify({
      trackId,
    }),
  });
  if (!response.ok) {
    throw new Error(`response is not ok: status=${response.status}`);
  }
}
