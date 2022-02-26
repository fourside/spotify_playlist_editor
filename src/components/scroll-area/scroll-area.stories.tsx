import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const componentMeta: ComponentMeta<typeof ScrollArea> = {
  title: ScrollArea.name,
  component: ScrollArea,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: "300px", height: "300px", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default componentMeta;

const Template: ComponentStory<typeof ScrollArea> = (args) => <ScrollArea {...args} />;

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <div>
      {TAGS.map((it) => (
        <div key={it}>{it}</div>
      ))}
    </div>
  ),
};
