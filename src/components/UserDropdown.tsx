import { Menu, Transition } from "@headlessui/react";
import { useLingui } from "@lingui/react";
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
}

const DropdownItem = ({
  as: Tag = "button",
  text,
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
        </Tag>
      )}
    </Menu.Item>
  );
};

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
}

export const UserDropdown = ({ user, onLogout }: UserDropdownProps) => {
  const { i18n } = useLingui();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="font-bold">{user.username}</Menu.Button>
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
            text={i18n._("Profile")}
            href={`/${user.username}`}
            as={WrappedLink}
          />
          <DropdownItem text={i18n._("Logout")} onClick={onLogout} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
