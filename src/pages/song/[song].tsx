/* eslint-disable @next/next/no-img-element */
import { Trans } from "@lingui/macro";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiClient } from "@api/client";
import { Post } from "@api/posts";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { Player } from "@components/Song/Player";
import { PostTabs } from "@components/Song/PostTabs";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";

const SongPageInner = ({ post }: { post: Post }) => {
  const apiClient = useApiClient();
  const { user } = useUser();
  const [refetchLikes, setRefetchLikes] = useState(0);

  const { data: postLike, refetch: likeRefetch } = useQuery(
    ["isSongLikes", post._id],
    () => apiClient.posts.isPostLiked(post._id).then((data) => data.data)
  );

  const { mutate: likeSong } = useMutation(
    () => apiClient.posts.like(post._id),
    {
      onSuccess: () => {
        likeRefetch();
        setRefetchLikes(refetchLikes + 1);
      },
    }
  );

  const { mutate: unlikeSong } = useMutation(
    () => apiClient.posts.unlike(post._id),
    {
      onSuccess: () => {
        likeRefetch();
        setRefetchLikes(refetchLikes + 1);
      },
    }
  );

  const toggleLike = () => {
    postLike?.isLiked ? unlikeSong() : likeSong();
  };

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
        <PostTabs post={post._id} refetchLikes={refetchLikes} />
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
