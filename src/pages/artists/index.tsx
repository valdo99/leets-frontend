import { TopArtists } from "@components/Artists/TopArtists";
import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { PlaylistiFrame } from "@components/PlaylistiFrame";

export default function Artists() {
  return (
    <>
      <div className="mt-8 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
        <div className="min-w-0 flex-1">
          <TopArtists />
        </div>
        <div className="flex shrink-0 flex-col lg:w-[340px]">
          <PlaylistiFrame />
        </div>
      </div>
      <WelcomeModal />
    </>
  );
}
