import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { TopHunterCard } from "@components/Hunters/TopHunterCard";
import { GenresSelect } from "@components/Songs/GenresSelect";
import { useApiClient } from "@providers/AuthProvider";
import { slugToName } from "@utils/genres";
import { getNextPageParam } from "@utils/getNextPageParam";

export const TopHunters = ({ genre }: { genre?: string }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const query = useInfiniteQuery(
    ["hunters-feed", genre],
    ({ pageParam }) =>
      apiClient.users.topHunters({ page: pageParam, genres: genre }),
    {
      getNextPageParam,
    }
  );

  return (
    <PaginatedItemsList
      title={t(i18n)`Top ${genre ? slugToName(genre) : ""} Hunters`}
      tooltip={t(i18n)`Score is based on number of likes to hunted songs`}
      noResultsMessage={t(i18n)`No hunters found`}
      query={query}
      item={(hunter) => <TopHunterCard key={hunter.username} hunter={hunter} />}
      header={<GenresSelect baseUrl="/hunters" selected={genre} />}
    />
  );
};
