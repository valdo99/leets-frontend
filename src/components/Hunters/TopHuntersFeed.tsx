import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { Button } from "@components/Basic/Button";
import { ItemsList } from "@components/Basic/List/ItemsList";
import { useApiClient } from "@providers/AuthProvider";

import { TopHunterCard } from "./TopHunterCard";

export const TopHuntersFeed = () => {
  const { i18n } = useLingui();

  const apiClient = useApiClient();

  // TODO: use limit instead of limiting in the frontend
  const query = useQuery(["top-hunters"], () =>
    apiClient.users.topHunters().then((data) => data.data.slice(0, 5))
  );

  return (
    <ItemsList
      query={query}
      title={t(i18n)`Top Hunters`}
      tooltip={t(i18n)`Score is based on number of likes to hunted songs`}
      item={(hunter) => <TopHunterCard key={hunter.username} hunter={hunter} />}
      footer={
        <Link href="/hunters">
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
