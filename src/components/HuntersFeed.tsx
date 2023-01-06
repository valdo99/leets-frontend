import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedList } from "@components/Basic/PaginatedList";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { TopHunterCard } from "@components/TopHunterCard";
import { useApiClient } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const HuntersFeed = () => {
  const apiClient = useApiClient();

  const query = useInfiniteQuery(
    ["hunters-feed"],
    ({ pageParam }) => apiClient.users.topHunters({ page: pageParam }),
    {
      getNextPageParam,
    }
  );

  return (
    <>
      <div className="mb-8 flex items-center space-x-3">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Top Hunters</Trans>
        </h2>
        <InfoTooltip
          color="secondary"
          content={
            <p className="max-w-[200px] text-center text-sm">
              <Trans>Score is based on number of likes to hunted songs</Trans>
            </p>
          }
        />
      </div>
      <PaginatedList
        query={query}
        item={(hunter) => (
          <TopHunterCard key={hunter.username} hunter={hunter} />
        )}
      />
    </>
  );
};
