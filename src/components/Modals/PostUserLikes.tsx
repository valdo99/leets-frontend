import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import cx from "classnames";
import { Fragment } from "react";

import { Avatar } from "@components/Basic/Avatar";
import { Button } from "@components/Basic/Button";
import { BaseModalProps, Modal } from "@components/Basic/Modal";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

interface PostUserLikesModalInterface extends BaseModalProps {
  postId: string;
}

export const PostUserLikes = ({
  show,
  onClose,
  postId,
}: PostUserLikesModalInterface) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const {
    data: likes,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["artists-feed", postId],
    ({ pageParam }) => apiClient.posts.getLikes(postId, { page: pageParam }),
    {
      getNextPageParam: ({ pagination }) => {
        const { page, perPage, total } = pagination;
        if ((page + 1) * perPage < total) {
          return page + 1;
        }
        return undefined;
      },
    }
  );

  return (
    <Modal show={show} onClose={onClose} title={t(i18n)`Likes`}>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-3">
            {likes?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((like) => (
                  <div
                    key={like._id}
                    className="rounded-btn flex w-full items-center justify-between space-x-3 bg-secondary px-2.5 py-4 text-secondary-content xs:space-x-4 xs:px-3"
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
    </Modal>
  );
};
