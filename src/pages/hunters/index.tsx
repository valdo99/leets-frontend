import { TopHunters } from "@components/Hunters/TopHunters";
import { PlaylistiFrame } from "@components/PlaylistiFrame";

export default function Hunters() {
  return (
    <div className="mt-8 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
      <div className="min-w-0 flex-1">
        <TopHunters />
      </div>
      <div className="flex shrink-0 flex-col lg:w-[340px]">
        <PlaylistiFrame />
      </div>
    </div>
  );
}
