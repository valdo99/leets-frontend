import { TopHunter } from "@api/users";

import { Avatar } from "./Basic/Avatar";

interface TopHunterCardProps {
  hunter: TopHunter;
}

export const TopHunterCard = ({ hunter }: TopHunterCardProps) => {
  return (
    <div className="rounded-btn flex w-full items-center justify-between space-x-3 bg-secondary px-2.5 py-4 text-secondary-content xs:space-x-4 xs:px-3">
      <Avatar user={hunter} />
      <div className="text-lg font-bold">{hunter.points}</div>
    </div>
  );
};
