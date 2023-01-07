import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import cx from "classnames";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { toast } from "react-toastify";

import { Id } from "@api/types";
import { Avatar } from "@components/Basic/Avatar";
import { Button } from "@components/Basic/Button";
import { Spinner } from "@components/Basic/Spinner";
import { TabItem, Tabs } from "@components/Basic/Tabs";
import { Textarea } from "@components/Basic/Textarea";
import { useForm } from "@hooks/useForm";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

interface LikesProps {
  song: Id;
  refetchLikes: number;
}

export const SongTabs = ({ song, refetchLikes }: LikesProps) => {
  const apiClient = useApiClient();
  const { i18n } = useLingui();
  const router = useRouter();
  const { user } = useUser();

  const {
    data: comments,
    isLoading: areCommentsLoading,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    isFetchingNextPage: isFetchingNextCommentPage,
    refetch: refetchComments,
  } = useInfiniteQuery(
    ["song-comments-list", song],
    ({ pageParam }) => apiClient.comments.list(song, { page: pageParam }),
    {
      getNextPageParam,
    }
  );

  const {
    data: likes,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["song-likes-list", song],
    ({ pageParam }) => apiClient.songs.getLikes(song, { page: pageParam }),
    {
      getNextPageParam,
    }
  );

  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      comment: "",
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    if (user) {
      await apiClient.comments.save(song, data);
      refetchComments();
      toast.success(t(i18n)`Comment posted successfully`);
    } else {
      router.push("/login");
    }
  });

  const tabItems: TabItem[] = [
    {
      label: t(i18n)`Likes` + ` (${likes?.pages[0].pagination.total})`,
      content: (
        <>
          {isLoading ? (
            <div className="flex justify-center py-32">
              <Spinner className="h-10 w-10" />
            </div>
          ) : (
            <>
              <h3 className="mt-4 mb-3 text-lg font-bold">
                {" "}
                <Trans>Likes</Trans> {` (${likes?.pages[0].pagination.total})`}
              </h3>
              <div className="flex w-full flex-wrap  gap-3">
                {likes?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page.data.map((like) => (
                      <div
                        key={like._id}
                        className="rounded-btn flex w-full items-center justify-between gap-3 bg-secondary px-2.5 py-4 text-secondary-content md:w-fit md:min-w-[32%] xs:gap-4 xs:px-3"
                      >
                        <Avatar user={like.user} joinDate={false} />
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
              <div
                className={cx(" flex  items-center justify-center", {
                  "mt-8 h-10": hasNextPage,
                })}
              >
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
            </>
          )}
        </>
      ),
    },
    {
      label: t(i18n)`Comments` + ` (${comments?.pages[0].pagination.total})`,
      content: (
        <div className="">
          {areCommentsLoading ? (
            <div className="flex justify-center py-32">
              <Spinner className="h-10 w-10" />
            </div>
          ) : (
            <>
              <h3 className="mt-4 mb-3 text-lg font-bold">
                {" "}
                <Trans>Comments</Trans>{" "}
                {` (${comments?.pages[0].pagination.total})`}
              </h3>

              <div className="flex w-full flex-wrap  gap-3">
                {comments?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page.data.map((comment) => (
                      <div
                        key={comment._id}
                        className="rounded-btn w-full flex-col items-center justify-between gap-3 bg-secondary px-2.5 py-4 text-secondary-content  xs:gap-4 xs:px-3"
                      >
                        <Avatar user={comment.user} joinDate={false} />
                        <p className="pl-12">{comment.comment}</p>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>

              {/* Load more button */}
              <div
                className={cx(" flex  items-center justify-center", {
                  "mt-8 h-10": hasNextCommentPage,
                })}
              >
                {isFetchingNextCommentPage ? (
                  <Spinner className="h-10 w-10" />
                ) : (
                  <>
                    {hasNextCommentPage && (
                      <Button onClick={() => fetchNextCommentPage()}>
                        <Trans>Load more</Trans>
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* New Comment form */}
              <form className="mt-4" onSubmit={onSubmit}>
                <Textarea
                  placeholder={t(i18n)`Comment`}
                  block
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  error={errors.comment}
                  className="flex-1"
                  label={t(i18n)`Comment this song`}
                  rows={4}
                />
                <Button disabled={disabled} loading={disabled} className="mt-4">
                  <Trans>Comment</Trans>
                </Button>
              </form>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (refetchLikes > 0) {
      refetch();
    }
  }, [refetchLikes, refetch]);

  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};
