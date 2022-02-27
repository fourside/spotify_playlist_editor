import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PopularityBar } from "./popularity-bar";

const componentMeta: ComponentMeta<typeof PopularityBar> = {
  title: "model/PopularityBar",
  component: PopularityBar,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#00000080", height: "100vh", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default componentMeta;

const Template: ComponentStory<typeof PopularityBar> = (args) => <PopularityBar {...args} />;

export const Low = Template.bind({});
Low.args = {
  popularity: 15,
};

export const Middle = Template.bind({});
Middle.args = {
  popularity: 52,
};

export const High = Template.bind({});
High.args = {
  popularity: 90,
};

export const Top = Template.bind({});
Top.args = {
  popularity: 100,
};
