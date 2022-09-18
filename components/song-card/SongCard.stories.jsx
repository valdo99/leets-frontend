import { SongCard } from "./SongCard";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/SongCard",
  component: SongCard,
};

const Template = (args) => <SongCard {...args}>Get started</SongCard>;

export const Default = Template.bind({});

Default.args = {
  spotifyId: "dasbodibsaid",
  postImage: "/coldplay.jpeg",
  artistName: "coldplay",
  trackTitle: "Fix You",
  previewTrackUrl:
    "https://p.scdn.co/mp3-preview/9263804f340b5ab87ac1456a1b104e02fc79b229?cid=6b724621694e4c26a75d1503298241f8",
};
