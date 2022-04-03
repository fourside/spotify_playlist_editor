import { render, screen, fireEvent } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Track } from "../../../model";
import { TrackComponent } from "../track";
import { EmptyTrackComponent } from "./empty-track";

describe("empty-track", () => {
  const droppedTrack: Track = {
    id: "42",
    name: "test-track",
    artistName: "test-artist",
    albumImageUrl: "example.com",
    durationMs: 1,
    popularity: 1,
    uri: "example.com",
  };

  test("saved-track type can be dropped onto empty playlist-track type", () => {
    // arrange
    const onDrop = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="saved-track"
          index={0}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={() => {}}
        />
        <EmptyTrackComponent dragType="playlist-track" onDrop={onDrop} />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const track = list[0];
    const emptyTrack = list[1];
    // act
    dragAndDrop(track, emptyTrack);
    // assert
    expect(onDrop).toHaveBeenCalledWith(droppedTrack, 0);
  });

  test("saved-track type cannot be dropped onto empty saved-track type", () => {
    // arrange
    const onDrop = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="saved-track"
          index={0}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={() => {}}
        />
        <EmptyTrackComponent dragType="saved-track" onDrop={onDrop} />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const track = list[0];
    const emptyTrack = list[1];
    // act
    dragAndDrop(track, emptyTrack);
    // assert
    expect(onDrop).not.toHaveBeenCalled();
  });

  test("playlist-track type can be dropped onto empty saved-track type", () => {
    // arrange
    const onDrop = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={0}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={() => {}}
        />
        <EmptyTrackComponent dragType="saved-track" onDrop={onDrop} />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const track = list[0];
    const emptyTrack = list[1];
    // act
    dragAndDrop(track, emptyTrack);
    // assert
    expect(onDrop).toHaveBeenCalledWith(droppedTrack, 0);
  });

  test("playlist-track type cannot be dropped onto empty playlist-track type", () => {
    // arrange
    const onDrop = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackComponent
          dragType="playlist-track"
          index={0}
          disabled={false}
          track={droppedTrack}
          onClickInformation={() => {}}
          onDragEnd={() => {}}
          onDrop={() => {}}
        />
        <EmptyTrackComponent dragType="playlist-track" onDrop={onDrop} />
      </DndProvider>
    );
    const list = screen.getAllByRole("listitem");
    const track = list[0];
    const emptyTrack = list[1];
    // act
    dragAndDrop(track, emptyTrack);
    // assert
    expect(onDrop).not.toHaveBeenCalled();
  });
});

function dragAndDrop(src: Element, dst: Element) {
  fireEvent.dragStart(src);
  fireEvent.dragEnter(dst);
  fireEvent.drop(dst);
  fireEvent.dragLeave(dst);
  fireEvent.dragEnd(src);
}
