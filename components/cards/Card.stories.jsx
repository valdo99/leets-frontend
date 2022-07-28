import React from "react";

import { MainCard } from "./Card";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Card",
  component: MainCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <div>
    <MainCard {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  spotifyId: "7LVHVU3tWfcxj5aiPFEW4Q",

  artistName: "Tutti fenomeni",

  trackTitle: "Il grande Modugno",

  postImage: "https://i.scdn.co/image/ab67616d0000b273c8164ffac09ce0144ad66ecc",

  likeCount: 450,

  previewTrackUrl:
    "https://p.scdn.co/mp3-preview/e3d78c84f476a7220a07b281bd81271af0047472?cid=6b724621694e4c26a75d1503298241f8",
};
