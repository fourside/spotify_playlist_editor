import { render, screen, waitFor, within } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { factory, primaryKey, drop } from "@mswjs/data";
import { Playlist, PlaylistsResponse, PlaylistTrackResponse, Track } from "../../../model";
import { PlaylistsComponent } from ".";
import userEvent from "@testing-library/user-event";
import assert from "assert";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SwrNoCacheWrapper } from "../../../lib/test-helper";

const fixturePlaylists: Playlist[] = [
  { id: "1", name: "playlist1" },
  { id: "2", name: "playlist2" },
  { id: "3", name: "playlist3" },
];
const fixtureTrack: Track = {
  id: "1",
  name: "track1",
  artistName: "artist1",
  albumImageUrl: "album1",
  durationMs: 100,
  popularity: 51,
  uri: "example.com/1",
};

describe("playlists", () => {
  let db: ReturnType<typeof factory>;
  const server = setupServer(
    rest.get<any, any, PlaylistsResponse>("/api/my-playlists", (req, res, ctx) => {
      return res(ctx.json({ playlists: db.playlist.getAll() }));
    }),
    rest.get<any, any, PlaylistTrackResponse>("/api/playlists/:playlistId", (req, res, ctx) => {
      return res(ctx.json({ tracks: [fixtureTrack] }));
    }),
    rest.post<string, any, Playlist>("/api/playlists", (req, res, ctx) => {
      const json = JSON.parse(req.body);
      if (json.name === undefined) {
        return res(ctx.status(400));
      }
      const id = (db.playlist.getAll().length + 1).toString();
      const c = db.playlist.create({ id, name: json.name });
      return res(ctx.status(201), ctx.json({ id, name: json.name }));
    })
  );

  beforeAll(() => {
    db = factory({
      playlist: {
        id: primaryKey(String),
        name: String,
      },
    });
    server.listen();
  });
  beforeEach(() => {
    fixturePlaylists.forEach((playlist) => db.playlist.create(playlist));
  });
  afterEach(() => {
    drop(db);
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  test("show playlists", async () => {
    // arrange & act
    render(
      <SwrNoCacheWrapper>
        <PlaylistsComponent onTrackInfoClick={() => {}} />
      </SwrNoCacheWrapper>
    );
    // assert
    expect((await screen.findByRole("list")).childNodes.length).toBe(3);
  });

  test("click button fire onTrackInfoClick", async () => {
    // arrange
    const onTrackInfoClick = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistsComponent onTrackInfoClick={onTrackInfoClick} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    const playlistComponentList = await screen.findByRole("list");
    const firstPlaylist = playlistComponentList.children[0];
    assert(firstPlaylist instanceof HTMLElement);
    const accordionButton = within(firstPlaylist).getByRole("button");
    userEvent.click(accordionButton);
    await within(firstPlaylist).findByRole("list");
    const buttons = within(firstPlaylist).getAllByRole("button");
    // act
    userEvent.click(buttons[1]); // first button is accordion's one
    // assert
    expect(onTrackInfoClick).toHaveBeenCalledWith(fixtureTrack);
  });

  test("show create playlist modal", async () => {
    // arrange
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistsComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    const buttons = await screen.findAllByRole("button");
    // act
    userEvent.click(buttons[3]); // 3 playlist accordions to have one button, then modal button is 4th
    // assert
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  test("create playlist by modal", async () => {
    // arrange
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistsComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    const buttons = await screen.findAllByRole("button");
    userEvent.click(buttons[3]); // 3 playlist accordions to have one button, then modal button is 4th
    const modal = await screen.findByRole("dialog");
    // act
    userEvent.type(within(modal).getByLabelText("playlist name"), "playlist4{enter}");
    // assert
    waitFor(() => {
      expect(screen.getByRole("list").childNodes.length).toBe(4);
    });
  });

  test("error", async () => {
    // arrange & act
    server.use(
      rest.get<any, any, PlaylistsResponse>("/api/my-playlists", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistsComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    // assert
    waitFor(() => {
      expect(screen.getByText(/my playlists error: /)).toBeInTheDocument();
    });
  });
});
