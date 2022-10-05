import { TopHunter } from "@api/users";

import { Avatar } from "./Basic/Avatar";

interface TopHunterCardProps {
  hunter: TopHunter;
}

export const TopHunterCard = ({ hunter }: TopHunterCardProps) => {
  return (
    <div className="rounded-btn flex w-full items-center justify-between gap-3 bg-secondary px-2.5 py-4 text-secondary-content xs:gap-4 xs:px-3">
      <div className="flex flex-col">
        <Avatar user={hunter} />
      </div>
      <div className="text-lg font-bold">{+hunter.points.toFixed(2)}</div>
    </div>
  );
};
