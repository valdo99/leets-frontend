import useFetch from "@hooks/useFetch";
import { useApiClient, useUser } from "@providers/AuthProvider";
import Spinner from "./basic/Spinner";

const UserLikedSongs = () => {
  const apiClient = useApiClient();
  const { user } = useUser();

  const { data, loading } = useFetch(() =>
    apiClient.users.likes(user.username).then((data) => data.data)
  );

  if (loading) return <Spinner />;

  return <div></div>;
};

export default UserLikedSongs;
