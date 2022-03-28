import { useCallback, useState, VFC } from "react";
import { pageContainer, editorContainer } from "./editor.css";
import { Track } from "../../../model";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TrackDetailComponent } from "../../model/track-detail";
import { Modal } from "../../ui/modal";
import { HeaderComponent } from "../../ui/header";
import { useSession } from "next-auth/react";
import { SavedTracksComponent } from "../../model/saved-tracks";
import { PlaylistsComponent } from "../../model/playlists";

export const Editor: VFC = () => {
  const { data: session } = useSession();
  const [trackDetail, setTrackDetail] = useState<Track>();

  const handleTrackInfoClick = useCallback((track: Track) => {
    setTrackDetail(track);
  }, []);

  const handleTrackDetailModalClose = useCallback(() => {
    setTrackDetail(undefined);
  }, []);

  return (
    <div className={pageContainer}>
      <HeaderComponent userName={session?.user?.name ?? ""} />
      <div className={editorContainer}>
        <DndProvider backend={HTML5Backend}>
          <SavedTracksComponent onTrackInfoClick={handleTrackInfoClick} />
          <PlaylistsComponent onTrackInfoClick={handleTrackInfoClick} />
        </DndProvider>
      </div>
      {trackDetail !== undefined && (
        <Modal open={true} onClose={handleTrackDetailModalClose}>
          <TrackDetailComponent track={trackDetail} />
        </Modal>
      )}
    </div>
  );
};
