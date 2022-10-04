import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@components/Basic/Spinner";
import { SongCard } from "@components/Song/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";

export const TopSongsFeed = () => {
  const { user, loading } = useUser();
  const apiClient = useApiClient();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery(
    ["feed", user?._id],
    () =>
      apiClient.posts.feed({ year: 2022, week: 32 }).then((data) => data.data),
    {
      enabled: !loading,
    }
  );

  return (
    <>
      <h1 className="mb-8 mt-10 text-2xl font-bold leading-tight">
        <Trans>Today&apos;s top songs</Trans>
      </h1>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts?.map((post) => (
            <SongCard key={post._id} post={post} onLikeChange={refetch} />
          ))}
        </div>
      )}
    </>
  );
};
