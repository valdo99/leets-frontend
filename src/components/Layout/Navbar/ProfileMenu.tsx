import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";

import { User } from "@api/users";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  WrappedLink,
} from "@components/Basic/Dropdown";
import { useApiClient } from "@providers/AuthProvider";

import { Avatar } from "../../Basic/Avatar";

interface ProfileMenuProps {
  user: User;
  onLogout: () => void;
  onClick?: () => void;
}

export const ProfileMenu = ({ user, onLogout, onClick }: ProfileMenuProps) => {
  const apiClient = useApiClient();

  const { data: notifications, refetch: refetchNotifications } = useQuery(
    ["user-notifications-count", user._id],
    () => apiClient.notifications.hasNotifications().then((data) => data.data)
  );

  return (
    <Dropdown className="inline-flex">
      <DropdownTrigger
        onClick={onClick}
        className="flex items-center space-x-2"
      >
        <Avatar user={user} onlyAvatar notifications={notifications} />
        <span className="hidden font-bold xs:block">{user.username}</span>
      </DropdownTrigger>
      <DropdownContent className="mt-4">
        <DropdownItem
          href={`/notifications`}
          as={WrappedLink}
          onClick={() => refetchNotifications()}
        >
          <Trans>Notifications</Trans>
          {notifications && notifications > 0 && (
            <span className="absolute right-4 mr-2 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
              {notifications}
            </span>
          )}
        </DropdownItem>
        <DropdownItem href={`/${user.username}`} as={WrappedLink}>
          <Trans>Profile</Trans>
        </DropdownItem>
        <DropdownItem onClick={onLogout}>
          <Trans>Logout</Trans>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
