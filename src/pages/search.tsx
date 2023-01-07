import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";

import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { Spinner } from "@components/Basic/Spinner";
import { SongCard } from "@components/Songs/SongCard";
import SearchIcon from "@icons/search.svg";
import { useApiClient } from "@providers/AuthProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const apiClient = useApiClient();
  const {
    data: songs,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["search-songs", searchValue],
    ({ pageParam }) =>
      apiClient.songs.search({
        page: pageParam,
        query: searchValue,
      }),
    {
      enabled: false,
      getNextPageParam,
    }
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      refetch();
    }, 500);
  }, [searchValue, refetch]);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold leading-tight">
        <Trans>Search for songs</Trans>
      </h2>
      <Input
        placeholder="Search..."
        leftIcon={<SearchIcon className="h-8 w-8" />}
        value={searchValue}
        onValueChange={setSearchValue}
        block
        size="lg"
      />
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {songs?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((song) => (
              <SongCard key={song._id} song={song} onLikeChange={refetch} />
            ))}
          </Fragment>
        ))}
      </div>
      {songs?.pages[0]?.data.length === 0 && searchValue !== "" && (
        <div className="mt-8 text-center text-lg">
          <Trans>No results found</Trans>
        </div>
      )}
      <div className="mt-8 flex h-10 items-center justify-center">
        {isFetchingNextPage ? (
          <Spinner className="h-10 w-10" />
        ) : (
          <>
            {hasNextPage && (
              <Button onClick={() => fetchNextPage()}>
                <Trans>Load more</Trans>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
