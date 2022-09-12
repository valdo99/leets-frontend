import Button from "./Button";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Get started</Button>;

export const Primary = Template.bind({});

Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: "secondary",
};

export const Small = Template.bind({});

Small.args = {
  size: "small",
};

export const Medium = Template.bind({});

Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});

Large.args = {
  size: "large",
};

const MyIcon = () => {
  return (
    <svg viewBox="0 0 24 24">
      <g>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </g>
    </svg>
  );
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  leftIcon: <MyIcon />,
};

export const WithRightIcon = Template.bind({});

WithRightIcon.args = {
  rightIcon: <MyIcon />,
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});

Loading.args = {
  loading: true,
};
