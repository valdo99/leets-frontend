import { Spinner } from "@components/Basic/Spinner";
import { useFetch } from "@hooks/useFetch";
import { useApiClient, useUser } from "@providers/AuthProvider";

export const UserLikedSongs = () => {
  const apiClient = useApiClient();
  const { user } = useUser();

  const { loading } = useFetch(() =>
    user ? apiClient.users.likes(user.username).then((data) => data.data) : []
  );

  if (loading) return <Spinner />;

  return <div></div>;
};
