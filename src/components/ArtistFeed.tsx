import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ArtistCard } from "@components/ArtistCard";
import { PaginatedList } from "@components/Basic/PaginatedList";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { useApiClient } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const ArtistsFeed = () => {
  const apiClient = useApiClient();

  const query = useInfiniteQuery(
    ["artists-feed"],
    ({ pageParam }) => apiClient.artists.topArtists({ page: pageParam }),
    {
      getNextPageParam,
    }
  );

  return (
    <div>
      <div className="mb-8 flex items-center space-x-3">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Top Artists</Trans>
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
        item={(artist) => <ArtistCard key={artist._id} artist={artist} />}
      />
    </div>
  );
};
