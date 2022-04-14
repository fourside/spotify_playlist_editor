import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EmptyTrackComponent } from "./empty-track";

const componentMeta: ComponentMeta<typeof EmptyTrackComponent> = {
  title: "model/EmptyTrack",
  component: EmptyTrackComponent,
  argTypes: {},
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    ),
  ],
};

export default componentMeta;

const Template: ComponentStory<typeof EmptyTrackComponent> = (args) => <EmptyTrackComponent {...args} />;
export const Normal = Template.bind({});
Normal.args = {
  dragType: "saved-track",
};
