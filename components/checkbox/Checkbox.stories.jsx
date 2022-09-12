import Checkbox from "./Checkbox";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Checkbox",
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const WithLabel = Template.bind({});

WithLabel.args = {
  label: "Agree terms",
};

export const Checked = Template.bind({});

Checked.args = {
  checked: true,
  label: "Agree terms",
};
