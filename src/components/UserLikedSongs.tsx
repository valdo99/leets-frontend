import { useQuery } from "@tanstack/react-query";

import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

import { SongCard } from "./Song/SongCard";

export const UserLikedSongs = ({ user }: { user: User }) => {
  const apiClient = useApiClient();

  const {
    data: likedPosts,
    isLoading,
    refetch,
  } = useQuery(["likedPosts", user?._id], () =>
    apiClient.users.likes(user.username).then((data) => data.data)
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      {likedPosts?.map((post) => (
        <SongCard key={post._id} post={post} onLikeChange={refetch} />
      ))}
    </div>
  );
};
