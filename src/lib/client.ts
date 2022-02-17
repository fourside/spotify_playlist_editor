import { PlaylistResponse, SavedTrackResponse } from "../model";
import { myPlaylistsResponseJson, savedTrackResponseJson } from "../schema";

export async function getSavedTracks(): Promise<SavedTrackResponse> {
  try {
    const response = await fetch(`/api/saved-tracks`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`response is not ok: status=${response.status}`);
    }
    const json = await response.json();
    return savedTrackResponseJson.parse(json);
  } catch (error) {
    throw error;
  }
}

export async function getMyPlaylists(): Promise<PlaylistResponse> {
  try {
    const response = await fetch(`/api/my-playlists`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`response is not ok: status=${response.status}`);
    }
    const json = await response.json();
    return myPlaylistsResponseJson.parse(json);
  } catch (error) {
    throw error;
  }
}
