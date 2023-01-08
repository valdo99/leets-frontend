import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  WrappedLink,
} from "@components/Basic/Dropdown";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { fromSlug, toSlug } from "@utils/genres";

interface GenresSelectProps {
  defaultLabel?: string;
  allItemsLabel?: string;
  baseUrl: string;
  selected: string | undefined;
}

export const GenresSelect = ({
  defaultLabel,
  allItemsLabel,
  baseUrl,
  selected,
}: GenresSelectProps) => {
  const { loading } = useUser();

  const apiClient = useApiClient();
  const { data: genres } = useQuery(
    ["genres"],
    () => apiClient.songs.genres().then((data) => data.data),
    {
      enabled: !loading,
    }
  );

  return (
    <Dropdown className="w-full">
      <DropdownTrigger
        className={cx(
          "flex items-center justify-between space-x-2 rounded-btn py-2 px-4 font-medium hover:bg-base-200 bg-base-200 w-full"
        )}
      >
        <span>
          {selected
            ? fromSlug(selected)
            : defaultLabel || <Trans>Select genre</Trans>}
        </span>
        <ChevronDownIcon />
      </DropdownTrigger>
      <DropdownContent className="mt-4 max-h-[18rem]">
        {selected && (
          <DropdownItem href={baseUrl} as={WrappedLink}>
            {allItemsLabel || <Trans>All genres</Trans>}
          </DropdownItem>
        )}
        {genres?.map((genre) => (
          <DropdownItem
            key={genre}
            href={`${baseUrl}/${toSlug(genre)}`}
            as={WrappedLink}
          >
            {fromSlug(genre)}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
