import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { TopHunterCard } from "@components/Hunters/TopHunterCard";
import { useApiClient } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const TopHunters = () => {
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
