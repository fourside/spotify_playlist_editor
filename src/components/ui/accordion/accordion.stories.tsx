import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Accordion } from "./accordion";

const componentMeta: ComponentMeta<typeof Accordion> = {
  title: "ui/Accordion",
  component: Accordion,
  argTypes: {},
};

export default componentMeta;

const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: "Normal Accordion",
  header: <div>Normal Accordion</div>,
  children: <div>hello</div>,
};
