import { rest } from "msw";
import { SpotifyResponse, SpotifySavedTrack, SpotifyTrack } from "../spotify/model";

const baseUrl = "https://api.spotify.com/v1";

export const handlers = [
  rest.get(`${baseUrl}/me/tracks`, (req, res, ctx) => {
    const offset = Number(new URL(req.url).searchParams.get("offset"));
    const tracks: SpotifyTrack[] = Array.from({ length: offset + 20 })
      .map((_, index) => generateMockSpotifyTrack(index + 1))
      .slice(offset);
    const response: SpotifyResponse<SpotifySavedTrack> = {
      href: `${baseUrl}/me/tracks?offset=${offset}`,
      items: tracks.map((track) => ({
        added_at: "2020-01-01T00:00:00.000Z",
        track,
      })),
      next: `${baseUrl}/me/tracks?offset=${offset}`,
      previous: null,
      offset: offset,
      limit: 20,
      total: 600,
    };
    return res(ctx.status(200), ctx.json({ ...response }));
  }),
];

function generateMockSpotifyTrack(index: number): SpotifyTrack {
  return {
    id: `track-${index}`,
    name: `Track ${index}`,
    popularity: Math.floor(Math.random() * 100),
    duration_ms: Math.floor(Math.random() * 1000) * 1000,
    artists: [{ name: `Artist ${index}` }],
    album: {
      images: [
        {
          url: "https://via.placeholder.com/300x300",
          height: 300,
          width: 300,
        },
      ],
    },
    type: "track",
    uri: `spotify:track:${index}`,
  };
}
