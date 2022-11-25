/* eslint-disable @next/next/no-img-element */
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "react-toastify";

import { ApiClient } from "@api/client";
import { Post } from "@api/posts";
import { Avatar } from "@components/Basic/Avatar";
import { Button } from "@components/Basic/Button";
import { Spinner } from "@components/Basic/Spinner";
import { TabItem, Tabs } from "@components/Basic/Tabs";
import { Textarea } from "@components/Basic/Textarea";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { Player } from "@components/Song/Player";
import { useForm } from "@hooks/useForm";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";

const SongPageInner = ({ post }: { post: Post }) => {
  const { i18n } = useLingui();
  const router = useRouter();

  const apiClient = useApiClient();
  const { user } = useUser();

  const { data: postLike, refetch: likeRefetch } = useQuery(
    ["isSongLikes", post._id],
    () => apiClient.posts.isPostLiked(post._id).then((data) => data.data)
  );

  const {
    data: likes,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["post-likes-list", post._id],
    ({ pageParam }) => apiClient.posts.getLikes(post._id, { page: pageParam }),
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

  const {
    data: comments,
    isLoading: areCommentsLoading,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    isFetchingNextPage: isFetchingNextCommentPage,
    refetch: refetchComments,
  } = useInfiniteQuery(
    ["song-comments-list", post._id],
    ({ pageParam }) => apiClient.comments.list(post._id, { page: pageParam }),
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
      await apiClient.comments.save(post._id, data);
      refetchComments();
      toast.success(t(i18n)`Comment posted successfully`);
    } else {
      router.push("/login");
    }
  });

  const { mutate: likeSong } = useMutation(
    () => apiClient.posts.like(post._id),
    {
      onSuccess: () => {
        refetch();
        likeRefetch();
      },
    }
  );

  const { mutate: unlikeSong } = useMutation(
    () => apiClient.posts.unlike(post._id),
    {
      onSuccess: () => {
        refetch();
        likeRefetch();
      },
    }
  );

  const toggleLike = () => {
    postLike?.isLiked ? unlikeSong() : likeSong();
  };

  const tabItems: TabItem[] = [
    {
      label: t(i18n)`Likes`,
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
      label: t(i18n)`Comments`,
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
                        className="rounded-btn w-full flex-col items-center justify-between gap-3 bg-secondary px-2.5 py-4 text-secondary-content md:w-fit md:min-w-[32%] xs:gap-4 xs:px-3"
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
                  label={t(i18n)`Comment this post`}
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

  return (
    <>
      <NextSeo
        description={`Leets | ${post.title}, by ${post.artist.name}, hunted by ${post.hunter.username}`}
        openGraph={{
          type: "website",
          locale: "en_IE",
          title: `Leets | ${post.title}`,
          description: `Leets | ${post.title}, by ${post.artist.name}, hunted by ${post.hunter.username}`,
          images: [
            {
              url: `https://leets.it/api/og-song?songImage=${post.image}&hunter=${post.hunter.username}&artist=${post.artist.name}&createdAt=${post.createdAt}&song=${post.title}`,
              alt: `${post.title} leets song page`,
              type: "image/png",
            },
          ],
        }}
        title={`Leets | ${post.title}`}
      />
      <div className="mt-8 flex flex-row justify-between">
        <div className="flex flex-row">
          <img
            alt="test"
            src={post.image}
            className="w-44 rounded-lg md:w-52"
          />
          <div className="ml-4 flex flex-col">
            <h3 className="text-2xl font-bold md:text-3xl">
              {post.artist.name}
            </h3>
            <h3 className="mt-2 text-xl font-bold md:text-3xl">{post.title}</h3>
            <div className="mt-3 flex flex-col md:hidden">
              <div className="sm:text-right">
                <p className="text-xs leading-3">
                  <Trans>Hunted by</Trans>
                </p>
                <Link href={`/${post.hunter.username}`}>
                  <a className="font-bold hover:text-slate-100">
                    {post.hunter.username}
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Player
                id={post._id}
                previewTrackUrl={post.preview_url}
                className="-ml-1 mt-4 "
                playerClassName="w-12 h-12 xs:w-15 xs:h-15"
              />
              <div className="ml-2 mt-4">
                {user ? (
                  <button onClick={toggleLike} className="cursor-pointer">
                    {postLike?.isLiked ? (
                      <HeartSolid className="text-4xl" />
                    ) : (
                      <HeartOutline className="text-4xl" />
                    )}
                  </button>
                ) : (
                  <Link href="/signup">
                    <a>
                      <HeartOutline className="text-4xl" />
                    </a>
                  </Link>
                )}
              </div>
            </div>
            {/* Play count*/}
            <div className="rounded-btn mt-4 hidden w-fit bg-base-200 py-2 px-4 text-sm sm:text-base md:flex">
              <span className="font-bold">
                <Trans>Play count</Trans>
              </span>
              <span className="flex items-center gap-2">
                <span>: {post.playcount} </span>
                <InfoTooltip
                  content={
                    <p className="max-w-[200px] text-center text-sm">
                      <Trans>Total times the song was played when hunted</Trans>
                    </p>
                  }
                  color="secondary"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="hidden flex-col sm:text-right md:flex">
          <p className="leading-3">
            <Trans>Hunted by</Trans>
          </p>
          <Link href={`/${post.hunter.username}`}>
            <a className="font-bold hover:text-slate-100">
              {post.hunter.username}
            </a>
          </Link>

          <p>on {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="rounded-btn mt-4 flex w-fit bg-base-200 py-2 px-4 text-sm sm:text-base md:hidden">
        <span className="font-bold">
          <Trans>Play count</Trans>
        </span>
        <span className="flex items-center gap-2">
          <span>: {post.playcount} </span>
          <InfoTooltip
            content={
              <p className="max-w-[200px] text-center text-sm">
                <Trans>Total times the song was played when hunted</Trans>
              </p>
            }
            color="secondary"
          />
        </span>
      </div>
      <div className="mt-8">
        <Tabs items={tabItems} />
      </div>
    </>
  );
};

const SongPage: PageWithLayout<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-20 w-20" />
      </div>
    );
  }

  return (
    <>
      <NextSeo
        description={`Leets | ${post.title}, by ${post.artist.name}, hunted by ${post.hunter.username}`}
        openGraph={{
          type: "website",
          locale: "en_IE",
          title: `Leets | ${post.title}`,
          description: `Leets | ${post.title}, by ${post.artist.name}, hunted by ${post.hunter.username}`,
          images: [
            {
              url: `https://leets.it/api/og-song?songImage=${post.image}&hunter=${post.hunter.username}&artist=${post.artist.name}&createdAt=${post.createdAt}&song=${post.title}`,
              alt: `${post.title} leets song page`,
              type: "image/png",
            },
          ],
        }}
        title={`Leets | ${post.title}`}
      />
      <SongPageInner post={post} />
    </>
  );
};

export default SongPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const song = params?.song?.toString() || "";

  const apiClient = new ApiClient();
  const { data: post } = await apiClient.posts.read(song);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
