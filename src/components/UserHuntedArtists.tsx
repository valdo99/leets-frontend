import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { ArtistCard } from "./ArtistCard";
import { Button } from "./Basic/Button";

export const UserHuntedArtists = ({ user }: { user: User }) => {
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();

  const isLoggedUser = user._id === loggedUser?._id;

  const { data: huntedArtists, isLoading } = useQuery(
    ["huntedArtists", user?._id, loggedUser?._id],
    () =>
      apiClient.users.huntedArtists(user.username).then((data) => data.data),
    {
      enabled: !loading,
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (huntedArtists?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-14">
        {isLoggedUser ? (
          <>
            <p className="text-lg">
              <Trans>You have no hunted artists yet</Trans>
            </p>
            <Link href="/upload">
              <a>
                <Button>
                  <Trans>Upload new song</Trans>
                </Button>
              </a>
            </Link>
          </>
        ) : (
          <p className="text-lg">
            <Trans>No hunted artists songs</Trans>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {huntedArtists?.map((artist) => (
        <ArtistCard key={artist._id} artist={artist} />
      ))}
    </div>
  );
};
