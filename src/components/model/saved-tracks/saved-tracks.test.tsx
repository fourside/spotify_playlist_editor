import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { factory, primaryKey, drop } from "@mswjs/data";
import { setupServer } from "msw/node";
import { SavedTrackResponse, Track } from "../../../model";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SavedTracksComponent } from ".";
import { dragAndDrop, SwrNoCacheWrapper } from "../../../lib/test-helper";
import { EmptyTrackComponent } from "../empty-track";
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

describe("saved tracks", () => {
  let db: ReturnType<typeof factory>;

  const server = setupServer(
    rest.get<any, any, SavedTrackResponse>("/api/saved-tracks", (req, res, ctx) => {
      const offset = req.params.offset ? parseInt(req.params.offset, 10) : 0;
      return res(ctx.json({ tracks: db.track.getAll() }));
    }),
    rest.put<string>("/api/saved-tracks", (req, res, ctx) => {
      const json = JSON.parse(req.body);
      if (json.trackId === undefined) {
        return res(ctx.status(400));
      }
      db.track.create({
        id: json.trackId,
        name: `track-${json.trackId}`,
        artistName: `artist-${json.trackId}`,
        albumImageUrl: `example.com/${json.trackId}`,
        durationMs: 0,
        popularity: 0,
        uri: json.trackId,
      });
      return res(ctx.status(201));
    }),
    rest.delete<string>("/api/saved-tracks", (req, res, ctx) => {
      const json = JSON.parse(req.body);
      if (json.trackId === undefined) {
        return res(ctx.status(400));
      }
      const result = db.track.delete({
        where: {
          id: {
            equals: json.trackId,
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

    const intersectionObserverMock = () => ({
      observe: () => null,
      disconnect: () => undefined,
    });
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
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

  test("show saved tracks", async () => {
    // arrange & act
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <SavedTracksComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    // assert
    expect(screen.queryByRole("list")).not.toBeInTheDocument(); // loading
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.childNodes.length).toBe(3);
  });

  test("drag and drop a saved track to playlist track, then remove it from saved tracks", async () => {
    // arrange
    const onDrop = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <EmptyTrackComponent dragType="playlist-track" onDrop={onDrop} />
        <SwrNoCacheWrapper>
          <SavedTracksComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    const list = await screen.findByRole("list");
    const targetTrack = list.childNodes[1]; // get second one
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

  test("drag and drop a playlist track to saved track, then add it to saved tracks", async () => {
    // arrange
    const playlistTrack: Track = {
      id: "100",
      name: "playlist track",
      artistName: "playlist track artist",
      albumImageUrl: "example.com/album",
      durationMs: 100,
      popularity: 50,
      uri: "example.com/playlist-track",
    };
    const onDragEnd = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          track={playlistTrack}
          dragType="playlist-track"
          index={0}
          disabled={false}
          onDrop={() => {}}
          onDragEnd={onDragEnd}
          onClickInformation={() => {}}
        />
        <SwrNoCacheWrapper>
          <SavedTracksComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    const listItems = screen.getAllByRole("listitem");
    const playlistTrackElement = listItems[0];

    const list = await screen.findByRole("list");
    const targetTrack = list.childNodes[1]; // get second one
    // eslint-disable-next-line testing-library/no-node-access
    const targetTrackElement = targetTrack.firstChild;
    assert(targetTrackElement instanceof Element);
    // act
    dragAndDrop(playlistTrackElement, targetTrackElement);
    // assert
    expect(screen.getByRole("list").childNodes.length).toBe(3);
    expect(onDragEnd).toHaveBeenCalledWith(playlistTrack);
    await waitFor(() => {
      expect(screen.getByRole("list").childNodes.length).toBe(4);
    });
  });

  test("zero track in playlist shows empty track", async () => {
    // arrange & act
    server.use(
      rest.get<any, any, SavedTrackResponse>("/api/saved-tracks", (req, res, ctx) => {
        return res(ctx.json({ tracks: [] }));
      })
    );
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <SavedTracksComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    // assert
    expect(await screen.findByText("No tracks")).toBeInTheDocument();
  });

  test("error", async () => {
    // arrange & act
    server.use(
      rest.get<any, any, SavedTrackResponse>("/api/saved-tracks", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <SavedTracksComponent onTrackInfoClick={() => {}} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    // assert
    expect(await screen.findByText(/error: /)).toBeInTheDocument();
  });

  test("click button fire onClickInformation", async () => {
    // arrange
    const onTrackInfoClick = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <SwrNoCacheWrapper>
          <SavedTracksComponent onTrackInfoClick={onTrackInfoClick} />
        </SwrNoCacheWrapper>
      </DndProvider>
    );
    await screen.findByRole("list");
    // act
    userEvent.click(screen.getAllByRole("button")[2]); // third one
    // assert
    expect(onTrackInfoClick).toHaveBeenCalledWith(fixtureTracks[2]);
  });
});
