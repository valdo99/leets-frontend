import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { TopHuntersFeed } from "@components/TopHuntersFeed";
import { TopSongsFeed } from "@components/TopSongsFeed";

export default function Home() {
  return (
    <>
      <div className="mt-10 flex flex-col gap-14 lg:flex-row">
        <div className="min-w-0 flex-1">
          <TopSongsFeed />
        </div>
        <div className="shrink-0 lg:w-[340px]">
          <TopHuntersFeed />
        </div>
      </div>
      <WelcomeModal />
    </>
  );
}
