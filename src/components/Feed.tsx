import { useAtom } from "jotai";

import { Spinner } from "@components/Basic/Spinner";
import { SongCard } from "@components/Song/SongCard";
import { useFetch } from "@hooks/useFetch";
import { useApiClient } from "@providers/AuthProvider";
import { userAtom } from "@state/user";

export const Feed = () => {
  const [user] = useAtom(userAtom);
  const apiClient = useApiClient();

  const { data: posts, loading } = useFetch(
    () =>
      apiClient.posts.feed({ year: 2022, week: 32 }).then((data) => data.data),
    [user.user?._id]
  );

  return (
    <div className="flex flex-col gap-14 lg:flex-row">
      <div className="flex-1">
        <h1 className="mb-8 mt-10 text-xl font-bold leading-tight">
          This week&apos;s top songs
        </h1>
        {loading ? (
          <div className="flex justify-center py-32">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts?.map((post, index) => (
              <SongCard key={post._id} position={index} post={post} />
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
