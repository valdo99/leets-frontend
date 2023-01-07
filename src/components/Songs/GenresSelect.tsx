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

interface GenresSelectProps {
  selected: string | undefined;
}

export const GenresSelect = ({ selected }: GenresSelectProps) => {
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
        <span>{selected || "Select genre"}</span>
        <ChevronDownIcon />
      </DropdownTrigger>
      <DropdownContent className="mt-6">
        {selected && (
          <DropdownItem href="/feed" as={WrappedLink}>
            All genres
          </DropdownItem>
        )}
        {genres?.map((genre) => (
          <DropdownItem key={genre} href={`/genre/${genre}`} as={WrappedLink}>
            {genre}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
