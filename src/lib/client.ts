import { SavedTrackResponse } from "../model";
import { savedTrackResponseJson } from "../schema";

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
