import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Artist } from "@api/artists";
import { ApiClient } from "@api/client";
import { ArtistHuntedSongs } from "@components/ArtistHuntedSongs";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { useApiClient } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";
import { formatDate } from "@utils/dates";

const ArtistPageInner = ({ artist }: { artist: Artist }) => {
  const apiClient = useApiClient();

  const { data: totalLikes } = useQuery(
    ["artist-total-likes", artist._id],
    () =>
      apiClient.artists.totalLikes(artist._id).then((data) => data.data.likes)
  );

  return (
    <>
      <div className="mt-10 flex flex-col justify-between gap-y-6 md:flex-row md:items-center">
        {/* Header */}
        <div className="flex min-w-0 items-center gap-4">
          <span className="relative h-16 w-16 shrink-0 md:h-24 md:w-24">
            <Image
              src={artist.image}
              alt={`Artist - ${artist.name}`}
              layout="fill"
              className="rounded-full"
              priority
            />
          </span>
          <h3 className="min-w-0 truncate text-2xl font-bold md:text-3xl">
            {artist.name}
          </h3>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-base-content-neutral">
            <Trans id="Hunted by (masculine)">Hunted by</Trans>
          </p>
          <Link href={`/${artist.hunter.username}`}>
            <a className="text-lg font-bold hover:text-base-content/60">
              {artist.hunter.username}
            </a>
          </Link>
          <p className="text-sm text-base-content-neutral">
            <Trans>on {formatDate(artist.createdAt)}</Trans>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 flex flex-wrap gap-4">
        {/* Monthly Listeners */}
        <div className="rounded-btn flex bg-base-200 py-2 px-4 text-sm sm:text-base">
          <span className="font-bold">
            <Trans>Monthly listeners</Trans>
          </span>
          <span className="flex items-center gap-2">
            <span>: {artist.monthly_listeners} </span>
            <InfoTooltip
              content={
                <p className="max-w-[200px] text-center text-sm">
                  <Trans>Monthly listeners the artist had when hunted</Trans>
                </p>
              }
              color="secondary"
            />
          </span>
        </div>

        {/* Total Likes */}
        <div className="rounded-btn bg-base-200 py-2 px-4 text-sm sm:text-base">
          <span className="font-bold">
            <Trans>Total likes</Trans>
          </span>
          : {totalLikes}
        </div>
      </div>

      {/* Hunted Songs */}
      <div className="mt-10">
        <h4 className="mb-4 text-xl font-bold">Hunted songs</h4>
        <ArtistHuntedSongs artist={artist} />
      </div>
    </>
  );
};

const ArtistPage: PageWithLayout<{ artist: Artist }> = ({ artist }) => {
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
        description={`Leets | ${artist.name}, hunted by ${artist.hunter.username} `}
        openGraph={{
          type: "website",
          locale: "en_IE",
          title: `Leets | ${artist.name}`,
          description: `Leets | ${artist.name} page, hunted by ${artist.hunter.username} `,
          images: [
            {
              url: `https://leets.it/api/og-artist?artistImage=${artist.image}&username=${artist.hunter.username}&name=${artist.name}&createdAt=${artist.createdAt}&monthlyListeners=${artist.monthly_listeners}`,
              alt: `${artist.name} leets profile page`,
              type: "image/png",
            },
          ],
        }}
        title={`Leets | ${artist.name}`}
      />
      <ArtistPageInner artist={artist} />
    </>
  );
};

export default ArtistPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id?.toString() || "";

  const apiClient = new ApiClient();
  const { data: artist } = await apiClient.artists.read(id);

  return {
    props: {
      artist,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
