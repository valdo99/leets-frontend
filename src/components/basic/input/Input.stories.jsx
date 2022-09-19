import Input from "./Input";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  placeholder: "Name",
};

export const Small = Template.bind({});

Small.args = {
  placeholder: "Name",
  size: "small",
};

export const Medium = Template.bind({});

Medium.args = {
  placeholder: "Name",
  size: "medium",
};

export const Large = Template.bind({});

Large.args = {
  placeholder: "Name",
  size: "large",
};

export const WithValue = Template.bind({});

WithValue.args = {
  value: "Mattia",
};

export const WithIcon = Template.bind({});

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

WithIcon.args = {
  placeholder: "Search...",
  leftIcon: <SearchIcon />,
};

export const WithRightIcon = Template.bind({});

WithRightIcon.args = {
  placeholder: "Search...",
  rightIcon: <SearchIcon />,
};

export const WithBothIcons = Template.bind({});

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

WithBothIcons.args = {
  placeholder: "Search...",
  leftIcon: <SearchIcon />,
  rightIcon: <CancelIcon />,
};

export const WithLabel = Template.bind({});

WithLabel.args = {
  label: "Name",
  controlId: "name",
};

export const FullWidth = Template.bind({});

FullWidth.args = {
  placeholder: "Name",
  fullWidth: true,
};

export const WithError = Template.bind({});

WithError.args = {
  placeholder: "Email",
  required: true,
  type: "email",
  error: "Must be a valid email",
};

export const WithMaxLength = Template.bind({});
