import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";

import { Artist } from "@api/artists";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { SongCard } from "./Song/SongCard";

export const ArtistHuntedSongs = ({ artist }: { artist: Artist }) => {
  const apiClient = useApiClient();
  const { loading, user } = useUser();

  const {
    data: songs,
    isLoading,
    refetch,
  } = useQuery(
    ["artist-songs", artist._id, user?._id],
    () => apiClient.artists.songs(artist._id).then((data) => data.data),
    {
      enabled: !loading,
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (songs?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-14">
        <p className="text-lg">
          <Trans>There are no hunted songs by this artist</Trans>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {songs?.map((song) => (
        <SongCard key={song._id} post={song} onLikeChange={refetch} />
      ))}
    </div>
  );
};