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

export const UserHuntedSongs = ({ user }: { user: User }) => {
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();
  const { setQueue } = usePlayer();

  const isLoggedUser = user._id === loggedUser?._id;

  const {
    data: uploadedPosts,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["uploadedPosts", user?._id, loggedUser?._id],
    ({ pageParam }) =>
      apiClient.users.uploads(user.username, { page: pageParam }),
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

  const onPlay = (pageIndex: number, indexInPage: number) => {
    if (!uploadedPosts) return;
    const perPage = uploadedPosts.pages[0].pagination.perPage;
    const index = pageIndex * perPage + indexInPage;
    setQueue(uploadedPosts.pages.map((page) => page.data).flat(), index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (uploadedPosts?.pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-14">
        {isLoggedUser ? (
          <>
            <p className="text-lg">
              <Trans>You have no uploaded songs yet</Trans>
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
            <Trans>No uploaded songs</Trans>
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {uploadedPosts?.pages.map((post, pageIndex) => (
          <Fragment key={pageIndex}>
            {post.data.map((post, index) => (
              <SongCard
                key={post._id}
                post={post}
                onLikeChange={refetch}
                onPlay={() => onPlay(pageIndex, index)}
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
