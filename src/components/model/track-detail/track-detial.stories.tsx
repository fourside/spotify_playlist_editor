import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TrackDetailComponent } from "./track-detail";

const componentMeta: ComponentMeta<typeof TrackDetailComponent> = {
  title: "model/TrackDetail",
  component: TrackDetailComponent,
  argTypes: {
    track: {
      id: "normal-id",
      name: "Normal Track",
      artistName: "Normal Artist",
      popularity: 30,
      durationMs: 120000,
      albumImageUrl: "https://via.placeholder.com/300.png",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#00000080", height: "100vh", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default componentMeta;

const Template: ComponentStory<typeof TrackDetailComponent> = (args) => <TrackDetailComponent {...args} />;
export const Normal = Template.bind({});
Normal.args = {
  track: {
    id: "normal-id",
    name: "Normal Track",
    artistName: "Normal Artist",
    popularity: 30,
    durationMs: 120000,
    albumImageUrl: "https://via.placeholder.com/300.png",
    uri: "spotify:track:normal-id",
  },
};
