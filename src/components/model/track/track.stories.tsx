import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TrackComponent } from "./track";

const componentMeta: ComponentMeta<typeof TrackComponent> = {
  title: "model/Track",
  component: TrackComponent,
  argTypes: {
    track: {
      id: "normal-id",
      name: "Normal Track",
      artistName: "Normal Artist",
      popularity: 30,
      durationMs: 12,
      albumImageUrl: "https://example.com/album.png",
    },
  },
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    ),
  ],
};

export default componentMeta;

const Template: ComponentStory<typeof TrackComponent> = (args) => <TrackComponent {...args} />;
export const Normal = Template.bind({});
Normal.args = {
  track: {
    id: "normal-id",
    name: "Normal Track",
    artistName: "Normal Artist",
    popularity: 30,
    durationMs: 12,
    albumImageUrl: "https://example.com/album.png",
    uri: "spotify:track:normal-id",
  },
  dragType: "saved-track",
};
