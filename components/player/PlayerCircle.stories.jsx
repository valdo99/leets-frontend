import React from "react";

import { Player } from "./Player";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "PlayerCircle",
  component: Player,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Player {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "PlayerCircle",
  previewTrackUrl:
    "https://p.scdn.co/mp3-preview/e3d78c84f476a7220a07b281bd81271af0047472?cid=6b724621694e4c26a75d1503298241f8",
  id: "e3d78c84f476a7220a07b281bd81271af0047472",
};
