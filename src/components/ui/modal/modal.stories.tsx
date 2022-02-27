import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal } from "./modal";

const componentMeta: ComponentMeta<typeof Modal> = {
  title: "ui/Modal",
  component: Modal,
  argTypes: {},
};

export default componentMeta;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <div
      style={{
        width: 300,
        height: 300,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
      }}
    >
      hello
    </div>
  ),
};
