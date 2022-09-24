import { useQuery } from "@tanstack/react-query";

import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

export const UserLikedSongs = ({ user }: { user: User }) => {
  const apiClient = useApiClient();

  const { isLoading } = useQuery(["likedPosts", user?._id], () =>
    apiClient.users.likes(user.username).then((data) => data.data)
  );

  if (isLoading) return <Spinner />;

  return <div></div>;
};
