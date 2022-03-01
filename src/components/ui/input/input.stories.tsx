import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

const componentMeta: ComponentMeta<typeof Input> = {
  title: "ui/Input",
  component: Input,
  argTypes: {},
};

export default componentMeta;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Normal = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: "disabled",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "placeholder",
};
