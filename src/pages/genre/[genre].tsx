import { useRouter } from "next/router";

import { AboutBanner } from "@components/AboutBanner";
import { TopArtistsPreview } from "@components/Artists/TopArtistsPreview";
import { TopHuntersPreview } from "@components/Hunters/TopHuntersPreview";
import { TopSongs } from "@components/Songs/TopSongs";

const GenrePageInner = ({ genre }: { genre: string }) => {
  return (
    <>
      <AboutBanner />
      <div className="mt-10 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
        <div className="min-w-0 flex-1">
          <TopSongs genre={genre} />
        </div>
        <div className="flex shrink-0 flex-col space-y-14 lg:w-[340px]">
          <TopHuntersPreview genre={genre} />
          <TopArtistsPreview genre={genre} />
        </div>
      </div>
    </>
  );
};

const GenrePage = () => {
  const router = useRouter();
  const genre = router.query.genre?.toString();

  if (!genre) {
    return null;
  }

  return <GenrePageInner genre={genre} />;
};

export default GenrePage;
