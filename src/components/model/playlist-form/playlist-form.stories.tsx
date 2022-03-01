import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PlaylistForm } from "./playlist-form";

const componentMeta: ComponentMeta<typeof PlaylistForm> = {
  title: "model/PlaylistForm",
  component: PlaylistForm,
  argTypes: {
    onSubmit: async (name: string) => {
      return name;
    },
  },
};

export default componentMeta;

const Template: ComponentStory<typeof PlaylistForm> = (args) => <PlaylistForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  submitting: false,
};

export const SubmitError = Template.bind({});
SubmitError.args = {
  submitting: false,
  onSubmit: () => {
    throw new Error("Submit Error");
  },
};

export const Submitting = Template.bind({});
Submitting.args = {
  submitting: true,
};
