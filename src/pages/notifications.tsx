import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { enUS, it } from "date-fns/locale";
import Link from "next/link";

import { AssetCommentSong } from "@api/notifications";
import { Button } from "@components/Basic/Button";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { PageAuth, PageWithLayout } from "@types";
import { getNextPageParam } from "@utils/getNextPageParam";

interface NotificationCardProps {
  username: string;
  comment?: string;
  song: AssetCommentSong;
  createdAt: string;
  status: number;
}

const NotificationCard = ({
  username,
  comment,
  song,
  createdAt,
  status,
}: NotificationCardProps) => {
  const { i18n } = useLingui();

  return (
    <div className="rounded-btn relative flex w-full items-center justify-between gap-3 bg-secondary px-2.5 py-4 text-secondary-content  xs:gap-4 xs:px-3">
      {status === 0 && (
        <span className="absolute top-[-3px] right-[-3px] inline-block h-3 w-3 rounded-full bg-red-600" />
      )}
      <span className="absolute bottom-1 right-2 text-xs ">
        {formatDistance(new Date(createdAt), new Date(), {
          locale: i18n.locale === "it" ? it : enUS,
        })}
        {` `}
        <Trans>ago</Trans>
      </span>
      <div className="min-w-0 flex-1">
        <p>
          <Link href={`/${username}`}>
            <a className="font-bold">
              {username} {` `}
            </a>
          </Link>
          {comment ? (
            <Trans>commented your song</Trans>
          ) : (
            <Trans>liked your song</Trans>
          )}
          {` `}
          <Link href={`/song/${song._id}`}>
            <a className="font-bold ">{song.title}</a>
          </Link>
          {` `}
          {comment && (
            <>
              <Trans>with:</Trans>
              {` `}
              <span className="font-bold">
                {`"`}
                {comment}
                {`"`}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const Notifications: PageWithLayout = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const {
    data: notifications,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["user-notifications", user?._id],
    ({ pageParam }) => apiClient.notifications.list({ page: pageParam }),
    {
      getNextPageParam,
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ["user-notifications-count", user?._id],
        });
      },
    }
  );

  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col items-center pt-12">
      <h1 className="mb-2 text-center text-2xl font-bold">
        <Trans>Notifications</Trans>
      </h1>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="w-full gap-4">
            {notifications?.pages.map((page, i) => (
              <div key={i}>
                {page.data.map((notification) => (
                  <div key={notification._id} className="p-2">
                    <NotificationCard
                      username={notification.user_from.username}
                      comment={notification.asset.comment}
                      song={notification.asset.song}
                      createdAt={notification.createdAt}
                      status={notification.status}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-8 flex h-10 items-center justify-center">
            {isFetchingNextPage ? (
              <Spinner className="h-10 w-10" />
            ) : (
              <>
                {hasNextPage && (
                  <Button block onClick={() => fetchNextPage()}>
                    <Trans>Load more</Trans>
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Notifications.auth = PageAuth.Private;

export default Notifications;
