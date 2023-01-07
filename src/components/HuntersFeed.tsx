import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { TopHunterCard } from "@components/TopHunterCard";
import { useApiClient } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

import { PaginatedItemsList } from "./Basic/List/PaginatedItemsList";

export const HuntersFeed = () => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const query = useInfiniteQuery(
    ["hunters-feed"],
    ({ pageParam }) => apiClient.users.topHunters({ page: pageParam }),
    {
      getNextPageParam,
    }
  );

  return (
    <PaginatedItemsList
      title={t(i18n)`Top Hunters`}
      tooltip={t(i18n)`Score is based on number of likes to hunted songs`}
      query={query}
      item={(hunter) => <TopHunterCard key={hunter.username} hunter={hunter} />}
    />
  );
};
