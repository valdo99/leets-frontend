import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@components/Basic/Spinner";
import { SongCard } from "@components/Song/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";

export const Feed = () => {
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
    <div className="flex flex-col gap-14 lg:flex-row">
      <div className="flex-1">
        <h1 className="mb-8 mt-10 text-xl font-bold leading-tight">
          This week&apos;s top songs
        </h1>
        {isLoading ? (
          <div className="flex justify-center py-32">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
              <SongCard key={post._id} post={post} onLikeChange={refetch} />
            ))}
          </div>
        )}
      </div>
      <div className="lg:w-[340px]">
        <h3 className="mb-8 mt-10 text-xl font-bold leading-tight">
          Last weeks
        </h3>
      </div>
    </div>
  );
};
