import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";

import { Button } from "./Basic/Button";
import { SongCard } from "./Song/SongCard";

export const UserLikedSongs = ({ user }: { user: User }) => {
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();
  const { setQueue } = usePlayer();

  const isLoggedUser = user._id === loggedUser?._id;

  const {
    data: likedPosts,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["likedPosts", user?._id, loggedUser?._id],
    ({ pageParam }) =>
      apiClient.users.likes(user.username, { page: pageParam }),
    {
      getNextPageParam: ({ pagination }) => {
        const { page, perPage, total } = pagination;
        if ((page + 1) * perPage < total) {
          return page + 1;
        }
        return undefined;
      },
      enabled: !loading,
    }
  );

  const onPlay = (songId: string) => {
    if (!likedPosts) return;

    const songsList = likedPosts.pages
      .map((page) => page.data)
      .flat()
      .filter((song) => song.preview_url !== null);
    const index = songsList.findIndex((song) => song._id === songId);

    setQueue(songsList, index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (likedPosts?.pages.length === 0) {
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
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {likedPosts?.pages.map((post, index) => (
          <Fragment key={index}>
            {post.data.map((post) => (
              <SongCard
                key={post._id}
                post={post}
                onLikeChange={refetch}
                onPlay={() => onPlay(post._id)}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {(isFetchingNextPage || hasNextPage) && (
        <div className="mt-8 flex h-10 items-center justify-center">
          {isFetchingNextPage ? (
            <Spinner className="h-10 w-10" />
          ) : (
            <>
              {hasNextPage && (
                <Button onClick={() => fetchNextPage()}>
                  <Trans>Load more</Trans>
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
