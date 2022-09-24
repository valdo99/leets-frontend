import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

import { User } from "@api/users";

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
}

export const UserDropdown = ({ user, onLogout }: UserDropdownProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>{user.username}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute -right-2 z-20 mt-3 flex min-w-[220px] flex-col gap-1 rounded-default bg-base-200 p-2 shadow-lg ring-1 ring-black/5">
          <Menu.Item>
            <button>
              <Link href={`/${user.username}`}>
                <a className="flex cursor-pointer items-center rounded-lg p-2">
                  Profile
                </a>
              </Link>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button onClick={onLogout}>
              <a className="flex cursor-pointer items-center rounded-lg p-2">
                Logout
              </a>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
