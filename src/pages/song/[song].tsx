/* eslint-disable @next/next/no-img-element */
import { Trans } from "@lingui/macro";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiClient } from "@api/client";
import { Song } from "@api/songs";
import { Button } from "@components/Basic/Button";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { PlayButton } from "@components/Songs/PlayButton";
import { SongTabs } from "@components/Songs/SongTabs";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import SpotifyIcon from "@icons/spotify.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";

const SongPageInner = ({ song }: { song: Song }) => {
  const apiClient = useApiClient();
  const { user } = useUser();
  const [refetchLikes, setRefetchLikes] = useState(0);

  const { data: songLike, refetch: likeRefetch } = useQuery(
    ["isSongLikes", song._id],
    () => apiClient.songs.isLiked(song._id).then((data) => data.data)
  );

  const { mutate: likeSong } = useMutation(
    () => apiClient.songs.like(song._id),
    {
      onSuccess: () => {
        likeRefetch();
        setRefetchLikes(refetchLikes + 1);
      },
    }
  );

  const { mutate: unlikeSong } = useMutation(
    () => apiClient.songs.unlike(song._id),
    {
      onSuccess: () => {
        likeRefetch();
        setRefetchLikes(refetchLikes + 1);
      },
    }
  );

  const toggleLike = () => {
    songLike?.isLiked ? unlikeSong() : likeSong();
  };

  return (
    <>
      <NextSeo
        description={`Leets | ${song.title}, by ${song.artist.name}, hunted by ${song.hunter.username}`}
        openGraph={{
          type: "website",
          locale: "en_IE",
          title: `Leets | ${song.title}`,
          description: `Leets | ${song.title}, by ${song.artist.name}, hunted by ${song.hunter.username}`,
          images: [
            {
              url: `https://leets.it/api/og-song?songImage=${song.image}&hunter=${song.hunter.username}&artist=${song.artist.name}&createdAt=${song.createdAt}&song=${song.title}`,
              alt: `${song.title} leets song page`,
              type: "image/png",
            },
          ],
        }}
        title={`Leets | ${song.title}`}
      />
      <div className="mt-8 flex flex-row justify-between">
        <div className="flex flex-row">
          <img
            alt="test"
            src={song.image}
            className="m-auto w-44 rounded-lg object-contain md:w-52"
          />
          <div className="ml-4 flex flex-col">
            <Link href={`/artist/${song.artist._id}`}>
              <a>
                <h3 className="font-medium uppercase">{song.artist.name}</h3>
              </a>
            </Link>
            <h3 className="text-xl font-bold md:text-3xl">{song.title}</h3>
            <div className="mt-2 flex flex-col md:hidden">
              <div className="sm:text-right">
                <p className="text-xs leading-3">
                  <Trans>Hunted by</Trans>
                </p>
                <Link href={`/${song.hunter.username}`}>
                  <a className="text-lg font-bold hover:text-base-content/60">
                    {song.hunter.username}
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {song.preview_url ? (
                <PlayButton
                  song={song}
                  className="-ml-1 mt-4 "
                  playerClassName="w-12 h-12 xs:w-15 xs:h-15"
                />
              ) : (
                <a
                  href={`https://open.spotify.com/track/${song.spotify_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    leftIcon={<SpotifyIcon className="h-4 w-4" />}
                    size="xs"
                    className="mt-1 px-2"
                  >
                    <Trans>Listen on Spotify</Trans>
                  </Button>
                </a>
              )}

              <div className="ml-2 mt-4">
                {user ? (
                  <button onClick={toggleLike} className="cursor-pointer">
                    {songLike?.isLiked ? (
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
              <span className="flex items-center space-x-2">
                <span>: {song.playcount} </span>
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
          <Link href={`/${song.hunter.username}`}>
            <a className="font-bold hover:text-base-content/60">
              {song.hunter.username}
            </a>
          </Link>

          <p>on {new Date(song.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="rounded-btn mt-4 flex w-fit bg-base-200 py-2 px-4 text-sm sm:text-base md:hidden">
        <span className="font-bold">
          <Trans>Play count</Trans>
        </span>
        <span className="flex items-center space-x-2">
          <span>: {song.playcount} </span>
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
      {song.preview_url && (
        <a
          href={`https://open.spotify.com/track/${song.spotify_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            leftIcon={<SpotifyIcon className="h-4 w-4" />}
            size="xs"
            className="mt-4 mb-0 rounded-lg px-3"
          >
            <Trans>Listen on Spotify</Trans>
          </Button>
        </a>
      )}
      <div className="mt-4">
        <SongTabs song={song._id} refetchLikes={refetchLikes} />
      </div>
    </>
  );
};

const SongPage: PageWithLayout<{ song: Song }> = ({ song }) => {
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
        description={`Leets | ${song.title}, by ${song.artist.name}, hunted by ${song.hunter.username}`}
        openGraph={{
          type: "website",
          locale: "en_IE",
          title: `Leets | ${song.title}`,
          description: `Leets | ${song.title}, by ${song.artist.name}, hunted by ${song.hunter.username}`,
          images: [
            {
              url: `https://leets.it/api/og-song?songImage=${song.image}&hunter=${song.hunter.username}&artist=${song.artist.name}&createdAt=${song.createdAt}&song=${song.title}`,
              alt: `${song.title} leets song page`,
              type: "image/png",
            },
          ],
        }}
        title={`Leets | ${song.title}`}
      />
      <SongPageInner song={song} />
    </>
  );
};

export default SongPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const songId = params?.song?.toString() || "";

  const apiClient = new ApiClient();
  const { data: song } = await apiClient.songs.read(songId);

  return {
    props: {
      song,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
