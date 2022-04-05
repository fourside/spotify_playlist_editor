import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Playlist, PlaylistTrackResponse, Track } from "../../../model";
import { PlaylistComponent } from "./playlist";

const tracks: Track[] = [
  {
    id: "1",
    name: "track1",
    artistName: "artist1",
    albumImageUrl: "album1",
    durationMs: 100,
    popularity: 51,
    uri: "example.com/1",
  },
  {
    id: "2",
    name: "track2",
    artistName: "artist2",
    albumImageUrl: "album2",
    durationMs: 200,
    popularity: 52,
    uri: "example.com/2",
  },
  {
    id: "3",
    name: "track3",
    artistName: "artist3",
    albumImageUrl: "album3",
    durationMs: 300,
    popularity: 53,
    uri: "example.com/3",
  },
];

describe("playlist", () => {
  const server = setupServer(
    rest.get<any, any, PlaylistTrackResponse>("/api/playlists/:playlistId", (req, res, ctx) => {
      return res(ctx.json({ tracks }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("show playlist tracks", async () => {
    // arrange
    const playlist: Playlist = {
      id: "42",
      name: "Normal Playlist",
    };
    // act
    render(
      <DndProvider backend={HTML5Backend}>
        <PlaylistComponent playlist={playlist} onClickInformation={() => {}} />
      </DndProvider>
    );
    userEvent.click(screen.getByRole("button"));
    // assert
    expect(screen.queryByRole("list")).not.toBeInTheDocument(); // loading
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.childNodes.length).toBe(3);
  });
});
