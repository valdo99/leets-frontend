import { Menu, Transition } from "@headlessui/react";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ElementType,
  forwardRef,
  Fragment,
  ReactNode,
} from "react";

import { User } from "@api/users";
import { useApiClient } from "@providers/AuthProvider";

import { Avatar } from "../../Basic/Avatar";

interface WrappedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const WrappedLink = forwardRef<HTMLAnchorElement, WrappedLinkProps>(
  (props, ref) => {
    const { href, children, ...rest } = props;

    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);

WrappedLink.displayName = "WrappedLink";

interface DropdownItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  text: string;
  onClick?: () => void;
  notifications?: number;
}

const DropdownItem = ({
  as: Tag = "button",
  text,
  notifications,
  ...rest
}: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Tag
          className={cx(
            "rounded-btn flex cursor-pointer items-center py-2 px-4 font-medium hover:bg-secondary hover:text-secondary-content",
            { "bg-secondary text-secondary-content": active }
          )}
          {...rest}
        >
          {text}
          {notifications && notifications > 0 && (
            <span className="absolute right-4 mr-2 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
              {notifications}
            </span>
          )}
        </Tag>
      )}
    </Menu.Item>
  );
};

interface ProfileMenuProps {
  user: User;
  onLogout: () => void;
  onClick?: () => void;
}

export const ProfileMenu = ({ user, onLogout, onClick }: ProfileMenuProps) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const { data: notifications, refetch: refetchNotifications } = useQuery(
    ["user-notifications-count", user._id],
    () => apiClient.notifications.hasNotifications().then((data) => data.data)
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2" onClick={onClick}>
        <Avatar user={user} onlyAvatar notifications={notifications} />
        <span className="hidden font-bold xs:block">{user.username}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items
          className={cx(
            "absolute -right-2 z-20 mt-4",
            "flex flex-col gap-1",
            "min-w-[220px] p-2",
            "rounded-btn",
            "bg-base-200",
            "shadow-lg drop-shadow-white ring-1 ring-white/10 shadow-white/10 focus:outline-none"
          )}
        >
          <DropdownItem
            text={t(i18n)`Notifications`}
            href={`/notifications`}
            as={WrappedLink}
            notifications={notifications}
            onClick={() => refetchNotifications()}
          />
          <DropdownItem
            text={t(i18n)`Profile`}
            href={`/${user.username}`}
            as={WrappedLink}
          />
          <DropdownItem text={t(i18n)`Logout`} onClick={onLogout} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
