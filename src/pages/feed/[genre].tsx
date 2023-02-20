import { useRouter } from "next/router";

import { TopArtistsPreview } from "@components/Artists/TopArtistsPreview";
import { TopHuntersPreview } from "@components/Hunters/TopHuntersPreview";
import { PlaylistiFrame } from "@components/PlaylistiFrame";
import { TopSongs } from "@components/Songs/TopSongs";

const FeedGenrePageInner = ({ genre }: { genre: string }) => {
  return (
    <>
      <div className="mt-8 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
        <div className="min-w-0 flex-1">
          <TopSongs genre={genre} />
        </div>
        <div className="flex shrink-0 flex-col space-y-14 lg:w-[340px]">
          <TopHuntersPreview genre={genre} />
          <TopArtistsPreview genre={genre} />
          <PlaylistiFrame />
        </div>
      </div>
    </>
  );
};

const FeedGenrePage = () => {
  const router = useRouter();
  const genre = router.query.genre?.toString();

  if (!genre) {
    return null;
  }

  return <FeedGenrePageInner genre={genre} />;
};

export default FeedGenrePage;
