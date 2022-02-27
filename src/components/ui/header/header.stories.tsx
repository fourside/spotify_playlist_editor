import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HeaderComponent } from "./header";

const componentMeta: ComponentMeta<typeof HeaderComponent> = {
  title: "ui/Header",
  component: HeaderComponent,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#00000080", height: "100vh", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default componentMeta;

const Template: ComponentStory<typeof HeaderComponent> = (args) => <HeaderComponent {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  userName: "fourside@gmail.com",
};
