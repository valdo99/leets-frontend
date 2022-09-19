import { useApiClient } from "@providers/AuthProvider";
import useFetch from "@hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@state/user";
import Spinner from "@components/basic/Spinner";
import { SongCard } from "@components/song/SongCard";

export const Feed = () => {
  const [user] = useAtom(userAtom);
  const apiClient = useApiClient();
  const [reload, setReload] = useState(false);
  const { data: posts, loading } = useFetch(
    () =>
      apiClient.posts.feed({ year: 2022, week: 32 }).then((data) => data.data),
    [reload]
  );

  useEffect(() => {
    setReload(!reload);
  }, [user]);

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="flex-1">
        <h1 className="font-bold leading-tight mb-8 mt-10 text-xl">
          This week&apos;s top songs
        </h1>
        {loading ? (
          <div className="flex justify-center py-30">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post, index) => (
              <SongCard
                key={post._id}
                position={index}
                spotifyId={post.spotify_id}
                artistName={post.artist.name}
                trackTitle={post.title}
                postImage={post.image}
                likeCount={post.likes}
                previewTrackUrl={post?.preview_url}
                id={post._id}
                isLiked={post.isLiked}
              />
            ))}
          </div>
        )}
      </div>
      <div className="lg:w-[340px]">
        <h3 className="font-bold leading-tight mb-8 mt-10 text-xl">
          Last weeks
        </h3>
      </div>
    </div>
  );
};
