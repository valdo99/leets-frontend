import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { Button } from "./Basic/Button";
import { SongCard } from "./Song/SongCard";

export const UserLikedSongs = ({ user }: { user: User }) => {
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();

  const isLoggedUser = user._id === loggedUser?._id;

  const {
    data: likedPosts,
    isLoading,
    refetch,
  } = useQuery(
    ["likedPosts", user?._id, loggedUser?._id],
    () => apiClient.users.likes(user.username).then((data) => data.data),
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

  if (likedPosts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-14">
        {isLoggedUser ? (
          <>
            <p className="text-lg">
              <Trans>You have no liked songs yet</Trans>
            </p>
            <Link href="/">
              <a>
                <Button>
                  <Trans>Discover songs</Trans>
                </Button>
              </a>
            </Link>
          </>
        ) : (
          <p className="text-lg">
            <Trans>No liked songs</Trans>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {likedPosts?.map((post) => (
        <SongCard key={post._id} post={post} onLikeChange={refetch} />
      ))}
    </div>
  );
};
