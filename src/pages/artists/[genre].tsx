import { useRouter } from "next/router";

import { TopArtists } from "@components/Artists/TopArtists";
import { PlaylistiFrame } from "@components/PlaylistiFrame";

const ArtistsGenrePageInner = ({ genre }: { genre: string }) => {
  return (
    <div className="mt-8 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
      <div className="min-w-0 flex-1">
        <TopArtists genre={genre} />
      </div>
      <div className="flex shrink-0 flex-col lg:w-[340px]">
        <PlaylistiFrame />
      </div>
    </div>
  );
};

const ArtistsGenrePage = () => {
  const router = useRouter();
  const genre = router.query.genre?.toString();

  if (!genre) {
    return null;
  }

  return <ArtistsGenrePageInner genre={genre} />;
};

export default ArtistsGenrePage;
