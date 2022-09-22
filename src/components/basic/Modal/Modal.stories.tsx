import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { Button } from "@components/Basic/Button";
import { Modal } from "@components/Basic/Modal";

export default {
  title: "Basic/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open modal</Button>
      <Modal {...args} show={showModal} onClose={() => setShowModal(false)}>
        Modal Content
      </Modal>
    </>
  );
};

export const Default = Template.bind({});

export const WithTitle = Template.bind({});

WithTitle.args = {
  title: "Login",
};
