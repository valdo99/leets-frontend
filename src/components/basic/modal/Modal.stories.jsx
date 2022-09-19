import { useState } from "react";
import Button from "@components/basic/button";
import Modal from "./Modal";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Modal",
  component: Modal,
};

const Template = (args) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open modal</Button>
      <Modal show={showModal} onClose={() => setShowModal(false)} {...args}>
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
