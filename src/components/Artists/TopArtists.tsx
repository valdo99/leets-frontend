import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ArtistCard } from "@components/Artists/ArtistCard";
import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { GenresSelect } from "@components/Songs/GenresSelect";
import { useApiClient } from "@providers/AuthProvider";
import { slugToName } from "@utils/genres";
import { getNextPageParam } from "@utils/getNextPageParam";

export const TopArtists = ({ genre }: { genre?: string }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const query = useInfiniteQuery(
    ["artists-feed", genre],
    ({ pageParam }) =>
      apiClient.artists.topArtists({ page: pageParam, genres: genre }),
    {
      getNextPageParam,
    }
  );

  return (
    <PaginatedItemsList
      title={t(i18n)`Top ${genre ? slugToName(genre) : ""} Artists`}
      tooltip={t(i18n)`Score is based on number of likes to hunted songs`}
      noResultsMessage={t(i18n)`No artists found`}
      query={query}
      item={(artist) => <ArtistCard key={artist._id} artist={artist} />}
      header={<GenresSelect baseUrl="/artists" selected={genre} />}
    />
  );
};
