import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

export const TopHuntersFeed = () => {
  const apiClient = useApiClient();

  const { data: hunters, isLoading } = useQuery(["top-hunters"], () =>
    apiClient.users.topHunters().then((data) => data.data)
  );

  return (
    <>
      <h3 className="mb-8 mt-10 text-2xl font-bold leading-tight">
        <Trans>Top Hunters</Trans>
      </h3>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {hunters?.map((hunter) => (
            <div key={hunter.username}>{hunter.username}</div>
          ))}
        </div>
      )}
    </>
  );
};
