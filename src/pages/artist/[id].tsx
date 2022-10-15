import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

import { Artist } from "@api/artists";
import { ApiClient } from "@api/client";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { SongCard } from "@components/Song/SongCard";
import { useApiClient } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";
import { formatDate } from "@utils/dates";

const ArtistPage: PageWithLayout<{ artist: Artist }> = ({ artist }) => {
  const apiClient = useApiClient();

  const { data: totalLikes } = useQuery(
    ["artist-total-likes", artist._id],
    () =>
      apiClient.artists.totalLikes(artist._id).then((data) => data.data.likes)
  );

  const { data: songs, refetch } = useQuery(["artist-songs", artist._id], () =>
    apiClient.artists.songs(artist._id).then((data) => data.data)
  );

  return (
    <>
      <NextSeo title={`Leets | ${artist.name}`} />
      <div className="mt-10 flex flex-col justify-between gap-y-6 md:flex-row md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <span className="relative h-16 w-16 shrink-0 md:h-24 md:w-24">
            <Image
              src={artist.image}
              alt={`Artist - ${artist.name}`}
              layout="fill"
              className="rounded-full"
            />
          </span>
          <h3 className="min-w-0 truncate text-2xl font-bold md:text-3xl">
            {artist.name}
          </h3>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-base-content-neutral">
            <Trans>Hunted by</Trans>
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

      <div className="mt-8 flex gap-4">
        <div className="rounded-btn bg-base-200 py-2 px-4">
          <span className="font-bold">
            <Trans>Total likes</Trans>
          </span>
          : {totalLikes}
        </div>
        <div className="rounded-btn flex bg-base-200 py-2 px-4">
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
      </div>

      {/* Hunted Songs */}
      <div className="mt-10">
        <h4 className="mb-4 text-xl font-bold">Hunted songs</h4>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {songs?.map((song) => (
            <SongCard key={song._id} post={song} onLikeChange={refetch} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtistPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id?.toString() || "";

    const apiClient = new ApiClient();
    const { data: artist } = await apiClient.artists.read(id);

    return {
      props: {
        artist,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
