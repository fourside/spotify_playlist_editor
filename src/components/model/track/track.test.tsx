import assert from "assert";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Track } from "../../../model";
import { TrackComponent } from "./track";
import { dragAndDrop } from "../../../lib/test-helper";

describe("track", () => {
  const droppedTrack: Track = {
    id: "42",
    name: "test-dropped-track",
    artistName: "test-dropped-artist",
    albumImageUrl: "example.com",
    durationMs: 1,
    popularity: 1,
    uri: "example.com",
  };
  const droppingTrack: Track = {
    id: "43",
    name: "test-dropping-track",
    artistName: "test-dropping-artist",
    albumImageUrl: "example.com",
    durationMs: 2,
    popularity: 2,
    uri: "example.com",
  };

  test("saved-track type can be dropped onto playlist-track type at top", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="saved-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="playlist-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].firstChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).toHaveBeenCalledWith(droppingTrack, droppedTrackIndex);
    expect(onDragEnd).toHaveBeenCalledWith(droppingTrack);
  });

  test("saved-track type can be dropped onto playlist-track type at bottom", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="saved-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="playlist-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].lastChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).toHaveBeenCalledWith(droppingTrack, droppedTrackIndex + 1);
    expect(onDragEnd).toHaveBeenCalledWith(droppingTrack);
  });

  test("playlist-track type can be dropped onto saved-track type at top", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="saved-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].firstChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).toHaveBeenCalledWith(droppingTrack, droppedTrackIndex);
    expect(onDragEnd).toHaveBeenCalledWith(droppingTrack);
  });

  test("playlist-track type can be dropped onto saved-track type at bottom", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="saved-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].lastChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).toHaveBeenCalledWith(droppingTrack, droppedTrackIndex + 1);
    expect(onDragEnd).toHaveBeenCalledWith(droppingTrack);
  });

  test("saved-track type cannot be dropped onto saved-track type at top", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="saved-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="saved-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].firstChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).not.toHaveBeenCalled();
    expect(onDragEnd).not.toHaveBeenCalled();
  });

  test("saved-track type cannot be dropped onto saved-track type at bottom", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="saved-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="saved-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].lastChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).not.toHaveBeenCalled();
    expect(onDragEnd).not.toHaveBeenCalled();
  });

  test("playlist-track type cannot be dropped onto playlist-track type at top", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="playlist-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].firstChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).not.toHaveBeenCalled();
    expect(onDragEnd).not.toHaveBeenCalled();
  });

  test("playlist-track type cannot be dropped onto playlist-track type at bottom", () => {
    // arrange
    const onDrop = jest.fn();
    const onDragEnd = jest.fn();
    const droppedTrackIndex = 2;
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={() => {}}
          onDragEnd={onDragEnd}
          onDrop={() => {}}
        />
        <TrackComponent
          dragType="playlist-track"
          index={droppedTrackIndex}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={onDrop}
        />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const droppingTrackElement = list[0];
    // eslint-disable-next-line testing-library/no-node-access
    const droppedTrackElement = list[1].lastChild;
    assert(droppedTrackElement !== null);
    // act
    dragAndDrop(droppingTrackElement, droppedTrackElement as Element);
    // assert
    expect(onDrop).not.toHaveBeenCalled();
    expect(onDragEnd).not.toHaveBeenCalled();
  });

  test("click button fire onClickInformation", () => {
    // arrange
    const onClickInformation = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={100}
          disabled={false}
          track={droppingTrack}
          onClickInformation={onClickInformation}
          onDragEnd={() => {}}
          onDrop={() => {}}
        />
      </DndProvider>
    );
    // act
    userEvent.click(screen.getByRole("button"));
    // assert
    expect(onClickInformation).toHaveBeenCalled();
  });
});
