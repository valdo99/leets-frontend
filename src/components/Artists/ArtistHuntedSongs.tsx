import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";

import { Artist } from "@api/artists";
import { ItemsList } from "@components/Basic/List/ItemsList";
import { SongCard } from "@components/Songs/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";

export const ArtistHuntedSongs = ({ artist }: { artist: Artist }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const { loading, user } = useUser();
  const { setQueue } = usePlayer();

  const query = useQuery(
    ["artist-songs", artist._id, user?._id],
    () => apiClient.artists.songs(artist._id).then((data) => data.data),
    {
      enabled: !loading,
    }
  );

  const { data: songs, refetch } = query;

  const onPlay = (songId: string) => {
    if (!songs) return;

    const songsList = songs.filter((song) => song.preview_url !== null);
    const index = songsList.findIndex((song) => song._id === songId);

    setQueue(songsList, index);
  };

  return (
    <ItemsList
      type="grid"
      query={query}
      noResultsMessage={t(i18n)`There are no hunted songs by this artist`}
      item={(song) => (
        <SongCard
          key={song._id}
          song={song}
          onLikeChange={refetch}
          onPlay={() => onPlay(song._id)}
        />
      )}
    />
  );
};
