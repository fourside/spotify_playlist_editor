import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Loader } from "./loader";

const componentMeta: ComponentMeta<typeof Loader> = {
  title: "ui/Loader",
  component: Loader,
  argTypes: {},
};

export default componentMeta;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Normal = Template.bind({});
