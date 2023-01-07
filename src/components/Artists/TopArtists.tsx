import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ArtistCard } from "@components/Artists/ArtistCard";
import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { useApiClient } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const TopArtists = () => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const query = useInfiniteQuery(
    ["artists-feed"],
    ({ pageParam }) => apiClient.artists.topArtists({ page: pageParam }),
    {
      getNextPageParam,
    }
  );

  return (
    <PaginatedItemsList
      title={t(i18n)`Top Artists`}
      tooltip={t(i18n)`Score is based on number of likes to hunted songs`}
      query={query}
      item={(artist) => <ArtistCard key={artist._id} artist={artist} />}
    />
  );
};
