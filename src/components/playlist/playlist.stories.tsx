import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Middleware, SWRConfig, SWRResponse } from "swr";
import { Track } from "../../model";
import { PlaylistComponent } from "./playlist";

const componentMeta: ComponentMeta<typeof PlaylistComponent> = {
  title: "Playlist",
  component: PlaylistComponent,
  argTypes: {},
};

export default componentMeta;

const Template: ComponentStory<typeof PlaylistComponent> = (args) => <PlaylistComponent {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  playlist: {
    id: "normal-playlist",
    name: "Normal Playlist",
  },
};
Normal.decorators = [
  (Story) => (
    <SWRConfig value={{ use: [getSWRMiddleware("normal")] }}>
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    </SWRConfig>
  ),
];

type MiddlewareType = "normal" | "zero" | "error" | "loading";

function getSWRMiddleware(type: MiddlewareType): Middleware {
  if (type === "normal") {
    return () => (): SWRResponse<any, any> => {
      return {
        data: { tracks: playlistTracks },
        error: undefined,
        mutate: (_) => Promise.resolve(),
        isValidating: false,
      };
    };
  }
  if (type === "zero") {
    return () => (): SWRResponse<any, any> => {
      return {
        data: { tracks: [] },
        error: undefined,
        mutate: (_) => Promise.resolve(),
        isValidating: false,
      };
    };
  }
  if (type === "error") {
    return () => (): SWRResponse<any, any> => {
      return {
        data: { tracks: [] },
        error: new Error("Error"),
        mutate: (_) => Promise.resolve(),
        isValidating: false,
      };
    };
  }
  if (type === "loading") {
    return () => (): SWRResponse<any, any> => {
      return {
        data: undefined,
        error: undefined,
        mutate: (_) => Promise.resolve(),
        isValidating: false,
      };
    };
  }
  const _exhaustiveCheck: never = type;
  return _exhaustiveCheck;
}

const playlistTracks: Track[] = [
  {
    id: "normal-id-1",
    name: "Normal Track 1",
    artistName: "Normal Artist",
    durationMs: 120000,
    popularity: 30,
    albumImageUrl: "https://example.com",
  },
  {
    id: "normal-id-2",
    name: "Normal Track 2",
    artistName: "Normal Artist",
    durationMs: 120000,
    popularity: 30,
    albumImageUrl: "https://example.com",
  },
  {
    id: "normal-id-3",
    name: "Normal Track 3",
    artistName: "Normal Artist",
    durationMs: 120000,
    popularity: 30,
    albumImageUrl: "https://example.com",
  },
];
