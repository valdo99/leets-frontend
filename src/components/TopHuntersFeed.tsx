import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

import { Button } from "./Basic/Button";
import { InfoTooltip } from "./Basic/Tooltip";
import { TopHunterCard } from "./TopHunterCard";

export const TopHuntersFeed = () => {
  const apiClient = useApiClient();

  // TODO: use limit instead of limiting in the frontend
  const { data: hunters, isLoading } = useQuery(["top-hunters"], () =>
    apiClient.users.topHunters().then((data) => data.data)
  );

  return (
    <div>
      <div className="mb-8 flex items-center space-x-3">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Top Hunters</Trans>
        </h2>
        <InfoTooltip
          color="secondary"
          content={
            <p className="max-w-[200px] text-center text-sm">
              <Trans>Score is based on number of likes to hunted songs</Trans>
            </p>
          }
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            {hunters?.slice(0, 5)?.map((hunter) => (
              <TopHunterCard key={hunter.username} hunter={hunter} />
            ))}
          </div>
          <Link href="/hunters">
            <a className="mt-8 block">
              <Button block>
                <Trans>See all</Trans>
              </Button>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
