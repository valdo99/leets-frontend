import { Feed } from "@components/Feed";
import { Layout } from "@components/layout/Layout";
import { SongCard } from "@components/song-card";

export default function Home() {
  return (
    <Layout>
      <Feed />
    </Layout>
  );
}
