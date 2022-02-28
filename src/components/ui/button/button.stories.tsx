import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./button";

const componentMeta: ComponentMeta<typeof Button> = {
  title: "ui/Button",
  component: Button,
  argTypes: {},
};

export default componentMeta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  buttonType: "primary",
  children: "primary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  buttonType: "tertiary",
  children: <span>tertiary</span>,
};

export const Danger = Template.bind({});
Danger.args = {
  buttonType: "danger",
  children: <span>danger</span>,
};
