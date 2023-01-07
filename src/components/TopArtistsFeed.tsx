import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { useApiClient } from "@providers/AuthProvider";

import { ArtistCard } from "./ArtistCard";
import { Button } from "./Basic/Button";
import { ItemsList } from "./Basic/List/ItemsList";

export const TopArtistsFeed = () => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  // TODO: use limit instead of limiting in the frontend
  const query = useQuery(["top-artists"], () =>
    apiClient.artists.topArtists().then((data) => data.data.slice(0, 5))
  );

  return (
    <ItemsList
      query={query}
      title={t(i18n)`Top Artists`}
      tooltip={t(i18n)`Score is based on number of likes to hunted songs`}
      item={(artist) => <ArtistCard key={artist._id} artist={artist} />}
      footer={
        <Link href="/artists">
          <a className="mt-8 block">
            <Button block>
              <Trans>See all</Trans>
            </Button>
          </a>
        </Link>
      }
    />
  );
};
