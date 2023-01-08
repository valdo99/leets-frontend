import { useRouter } from "next/router";

import { AboutBanner } from "@components/AboutBanner";
import { TopArtists } from "@components/Artists/TopArtists";
import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { PlaylistiFrame } from "@components/PlaylistiFrame";

const ArtistsGenrePageInner = ({ genre }: { genre: string }) => {
  return (
    <>
      <AboutBanner />
      <div className="mt-10 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
        <div className="min-w-0 flex-1">
          <TopArtists genre={genre} />
        </div>
        <div className="flex shrink-0 flex-col lg:w-[340px]">
          <PlaylistiFrame />
        </div>
      </div>
      <WelcomeModal />
    </>
  );
};

const ArtistsGenrePage = () => {
  const router = useRouter();
  const genre = router.query.genre?.toString().replace("-", "/");

  if (!genre) {
    return null;
  }

  return <ArtistsGenrePageInner genre={genre} />;
};

export default ArtistsGenrePage;
