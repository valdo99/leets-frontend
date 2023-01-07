import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { User } from "@api/users";
import { ArtistCard } from "@components/Artists/ArtistCard";
import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const UserHuntedArtists = ({ user }: { user: User }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();

  const isLoggedUser = user._id === loggedUser?._id;

  const query = useInfiniteQuery(
    ["huntedArtists", user?._id, loggedUser?._id],
    ({ pageParam }) =>
      apiClient.users.huntedArtists(user.username, { page: pageParam }),
    {
      getNextPageParam,
      enabled: !loading,
    }
  );

  return (
    <PaginatedItemsList
      type="grid"
      query={query}
      noResultsMessage={
        isLoggedUser
          ? t(i18n)`You have no hunted artists yet`
          : t(i18n)`No hunted artists songs yet`
      }
      noResulstsCta={
        isLoggedUser
          ? { label: t(i18n)`Upload new song`, href: "/upload" }
          : undefined
      }
      item={(artist) => <ArtistCard key={artist._id} artist={artist} />}
    />
  );
};
