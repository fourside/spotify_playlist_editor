import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { factory, primaryKey, drop } from "@mswjs/data";
import { setupServer } from "msw/node";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Playlist, PlaylistTrackResponse, Track } from "../../../model";
import { PlaylistComponent } from "./playlist";
import { EmptyTrackComponent } from "../empty-track";
import { dragAndDrop, SwrNoCacheWrapper } from "../../../lib/test-helper";
import { TrackComponent } from "../track";
import assert from "assert";

const fixtureTracks: Track[] = [
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
  let db: ReturnType<typeof factory>;
  const server = setupServer(
    rest.get<any, any, PlaylistTrackResponse>("/api/playlists/:playlistId", (req, res, ctx) => {
      return res(ctx.json({ tracks: db.track.getAll() }));
    }),
    rest.post<string>("/api/playlists/:playlistId/tracks", (req, res, ctx) => {
      const json = JSON.parse(req.body);
      if (json.trackUri === undefined || json.position === undefined) {
        return res(ctx.status(400));
      }
      const id = (db.track.getAll().length + 1).toString();
      db.track.create({
        id,
        name: `track-${id}`,
        artistName: `artist-${id}`,
        albumImageUrl: `example.com/${id}`,
        durationMs: 0,
        popularity: 0,
        uri: json.trackUri,
      });
      return res(ctx.status(201));
    }),
    rest.delete<string>("/api/playlists/:playlistId/tracks", (req, res, ctx) => {
      const json = JSON.parse(req.body);
      if (json.trackUri === undefined) {
        return res(ctx.status(400));
      }
      const result = db.track.delete({
        where: {
          uri: {
            equals: json.trackUri,
          },
        },
      });
      if (!result) {
        return res(ctx.status(404));
      }
      return res(ctx.status(200));
    })
  );

  beforeAll(() => {
    db = factory({
      track: {
        id: primaryKey(String),
        name: String,
        artistName: String,
        albumImageUrl: String,
        durationMs: Number,
        popularity: Number,
        uri: String,
      },
    });
    server.listen();
  });
  beforeEach(() => {
    fixtureTracks.forEach((track) => db.track.create(track));
  });
  afterEach(() => {
    drop(db);
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

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

  test("drag and drop a playlist track to saved track, then remove it from playlist", async () => {
    // arrange
    const playlist: Playlist = {
      id: "42",
      name: "Normal Playlist",
    };
    const onDrop = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <EmptyTrackComponent dragType="saved-track" onDrop={onDrop} />
        <SwrNoCacheWrapper>
          <PlaylistComponent playlist={playlist} onClickInformation={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    userEvent.click(screen.getByRole("button"));
    const list = await screen.findByRole("list");
    const targetTrack = list.childNodes[1];
    const listItems = screen.getAllByRole("listitem");
    const emptyTrack = listItems[0];
    // act
    dragAndDrop(targetTrack as Element, emptyTrack);
    // assert
    expect(onDrop).toHaveBeenCalledWith(fixtureTracks[1], 0);
    await waitFor(() => {
      expect(targetTrack).not.toBeInTheDocument();
    });
  });

  test("drag and drop a saved track to playlist, then add it to playlist", async () => {
    // arrange
    const playlist: Playlist = {
      id: "42",
      name: "Normal Playlist",
    };
    const savedTrack: Track = {
      id: "100",
      name: "saved track",
      artistName: "saved track artist",
      albumImageUrl: "example.com/album",
      durationMs: 100,
      popularity: 50,
      uri: "example.com/saved",
    };
    const onDragEnd = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          track={savedTrack}
          dragType="saved-track"
          index={0}
          disabled={false}
          onDrop={() => {}}
          onDragEnd={onDragEnd}
          onClickInformation={() => {}}
        />
        <SwrNoCacheWrapper>
          <PlaylistComponent playlist={playlist} onClickInformation={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    userEvent.click(screen.getAllByRole("button")[1]);
    const list = await screen.findByRole("list");
    const targetTrackElement = list.childNodes[1];
    // eslint-disable-next-line testing-library/no-node-access
    const targetDroppedElement = targetTrackElement.firstChild;
    assert(targetDroppedElement !== null);
    const listItems = screen.getAllByRole("listitem");
    const savedTrackElement = listItems[0];
    // act
    dragAndDrop(savedTrackElement, targetDroppedElement as Element);
    // assert
    expect(screen.getByRole("list").childNodes.length).toBe(3);
    expect(onDragEnd).toHaveBeenCalledWith(savedTrack);
    await waitFor(() => {
      expect(screen.getByRole("list").childNodes.length).toBe(4);
    });
  });

  test("zero track in playlist shows empty track", async () => {
    // arrange & act
    server.use(
      rest.get<any, any, PlaylistTrackResponse>("/api/playlists/:playlistId", (req, res, ctx) => {
        return res(ctx.json({ tracks: [] }));
      })
    );
    const playlist: Playlist = {
      id: "42",
      name: "Normal Playlist",
    };
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistComponent playlist={playlist} onClickInformation={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    userEvent.click(screen.getAllByRole("button")[0]);
    // assert
    expect(await screen.findByText("No tracks")).toBeInTheDocument();
  });

  test("error", async () => {
    // arrange & act
    server.use(
      rest.get<any, any, PlaylistTrackResponse>("/api/playlists/:playlistId", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    const playlist: Playlist = {
      id: "42",
      name: "Normal Playlist",
    };
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistComponent playlist={playlist} onClickInformation={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    userEvent.click(screen.getAllByRole("button")[0]);
    // assert
    expect(await screen.findByText(/error: /)).toBeInTheDocument();
  });

  test("click button fire onClickInformation", async () => {
    // arrange
    const playlist: Playlist = {
      id: "42",
      name: "Normal Playlist",
    };
    const onClickInformation = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <PlaylistComponent playlist={playlist} onClickInformation={onClickInformation} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    userEvent.click(screen.getAllByRole("button")[0]);
    await screen.findByRole("list");
    // act
    userEvent.click(screen.getAllByRole("button")[2]);
    // assert
    expect(onClickInformation).toHaveBeenCalledWith(fixtureTracks[1]);
  });
});
