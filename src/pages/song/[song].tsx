import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiClient } from "@api/client";
import { Song } from "@api/songs";
import { Button } from "@components/Basic/Button";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { LikeButton } from "@components/Songs/LikeButton";
import { PlayButton } from "@components/Songs/PlayButton";
import { SongTabs } from "@components/Songs/SongTabs";
import { useFormatNumber } from "@hooks/useFormatNumber";
import SpotifyIcon from "@icons/spotify.svg";
import { useApiClient } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";
import { slugToName } from "@utils/genres";

const SongPageInner = ({ song }: { song: Song }) => {
  const apiClient = useApiClient();
  const [refetchLikes, setRefetchLikes] = useState(0);
  const { format } = useFormatNumber();

  const { data: songLike, refetch: likeRefetch } = useQuery(
    ["isSongLikes", song._id],
    () => apiClient.songs.isLiked(song._id).then((data) => data.data)
  );

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
      <div className="mt-8 flex flex-col justify-between space-y-6 sm:flex-row sm:items-center sm:space-y-0">
        {/* Song Info */}
        <div className="flex flex-row items-center">
          {/* Image */}
          <div className="relative h-28 w-28 sm:h-44 sm:w-44">
            <Image
              alt="Song cover"
              src={song.image}
              className="rounded-box object-contain"
              layout="fill"
              unoptimized
            />
          </div>
          {/* Song Details */}
          <div className="ml-4 flex flex-col">
            <Link href={`/artist/${song.artist._id}`}>
              <a>
                <h3 className="text-sm font-medium uppercase">
                  {song.artist.name}
                </h3>
              </a>
            </Link>

            <h3 className="text-2xl font-bold md:text-3xl">{song.title}</h3>

            <div className="mt-1 flex items-center">
              {song.preview_url ? (
                <PlayButton song={song} className="-ml-1" size={2.5} />
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

              {/* Spotify Icon */}
              {song.preview_url && (
                <a
                  href={`https://open.spotify.com/track/${song.spotify_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 cursor-pointer"
                >
                  <SpotifyIcon className="h-6 w-6" />
                </a>
              )}

              <LikeButton
                onSuccess={() => {
                  likeRefetch();
                  setRefetchLikes(refetchLikes + 1);
                }}
                song={{
                  ...song,
                  isLiked: songLike?.isLiked ? 1 : 0,
                }}
                className="ml-2 h-10 w-10"
              />
            </div>

            {/* Play count & Genres (Desktop) */}
            <div className="mt-2 hidden flex-wrap space-x-2 sm:flex">
              <div className="rounded-btn flex bg-base-200 py-2 px-4 text-sm sm:text-base">
                <div className="font-bold">
                  <Trans>Play count</Trans>
                </div>
                <div className="flex items-center space-x-2">
                  <div>: {format(song.playcount || 0)}</div>
                  <InfoTooltip
                    content={
                      <p className="max-w-[200px] text-center text-sm">
                        <Trans>
                          Total times the song was played when hunted
                        </Trans>
                      </p>
                    }
                    color="secondary"
                  />
                </div>
              </div>
              {song.artist.genres?.map((genre) => (
                <div
                  key={genre}
                  className="rounded-btn w-fit bg-base-200 py-2 px-4 text-sm sm:flex sm:text-base"
                >
                  {slugToName(genre)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Play count & Genres (Mobile) */}
        <div className="mt-2 flex-col space-y-2 sm:hidden">
          <div className="rounded-btn flex bg-base-200 py-2 px-4 text-sm sm:text-base">
            <div className="font-bold">
              <Trans>Play count: </Trans>
            </div>
            <div className="flex items-center space-x-2">
              <div>{song.playcount}</div>
              <InfoTooltip
                content={
                  <p className="max-w-[200px] text-center text-sm">
                    <Trans>Total times the song was played when hunted</Trans>
                  </p>
                }
                color="secondary"
              />
            </div>
          </div>
          {song.artist.genres?.map((genre) => (
            <div
              key={genre}
              className="rounded-btn bg-base-200 py-2 px-4 text-sm sm:flex sm:text-base"
            >
              {slugToName(genre)}
            </div>
          ))}
        </div>

        {/* Hunter */}
        <div className="flex flex-col sm:text-right">
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

      <div className="mt-10 sm:mt-8">
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
