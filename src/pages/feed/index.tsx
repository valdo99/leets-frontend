import { TopArtistsPreview } from "@components/Artists/TopArtistsPreview";
import { TopHuntersPreview } from "@components/Hunters/TopHuntersPreview";
import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { PlaylistiFrame } from "@components/PlaylistiFrame";
import { TopSongs } from "@components/Songs/TopSongs";

export default function Home() {
  return (
    <>
      <div className="mt-8 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
        <div className="min-w-0 flex-1">
          <TopSongs />
        </div>
        <div className="flex shrink-0 flex-col space-y-14 lg:w-[340px]">
          <TopHuntersPreview />
          <TopArtistsPreview />
          <PlaylistiFrame />
        </div>
      </div>
      <WelcomeModal />
    </>
  );
}
