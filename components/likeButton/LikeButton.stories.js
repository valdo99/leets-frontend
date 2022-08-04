import React from "react";

import  LikeButton  from "./LikeButton";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/LikeButton",
  component: LikeButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <><LikeButton {...args} /></>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  isLiked: false,
  likes: 400,
  id: "62e7083def5538ffb74aa838"
};
