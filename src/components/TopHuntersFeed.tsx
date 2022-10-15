import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

import { InfoTooltip } from "./Basic/Tooltip";
import { TopHunterCard } from "./TopHunterCard";

export const TopHuntersFeed = () => {
  const apiClient = useApiClient();

  const { data: hunters, isLoading } = useQuery(["top-hunters"], () =>
    apiClient.users.topHunters().then((data) => data.data)
  );

  return (
    <>
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Top Hunters</Trans>
        </h2>
        <InfoTooltip
          color="secondary"
          content={
            <p className="max-w-[200px] text-center text-sm">
              <Trans>Score is based on likes to hunted songs</Trans>
            </p>
          }
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {hunters?.map((hunter) => (
            <TopHunterCard key={hunter.username} hunter={hunter} />
          ))}
        </div>
      )}
    </>
  );
};
