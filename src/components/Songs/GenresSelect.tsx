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
import { useApiClient } from "@providers/AuthProvider";
import { slugToName } from "@utils/genres";

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
  const apiClient = useApiClient();
  const { data: genres } = useQuery(["genres"], () =>
    apiClient.genres.list().then((data) => data.data)
  );

  console.log("Selected genre: ", selected);

  return (
    <Dropdown className="w-full">
      <DropdownTrigger
        className={cx(
          "flex items-center justify-between space-x-2 rounded-btn py-2 px-4 font-medium hover:bg-base-200 bg-base-200 w-full"
        )}
      >
        <span>
          {selected
            ? slugToName(selected)
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
            href={`${baseUrl}/${genre}`}
            as={WrappedLink}
          >
            {slugToName(genre)}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
