import { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const UserDropdown = ({ user, onLogout }) => {
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
        <Menu.Items className="absolute min-w-[220px] z-20 mt-3 -right-2 flex flex-col gap-1 p-2 rounded-default shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-900">
          <Menu.Item>
            <button>
              <Link href={`/${user.username}`}>
                <a className="flex items-center p-2 rounded-lg cursor-pointer">
                  Profile
                </a>
              </Link>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button onClick={onLogout}>
              <a className="flex items-center p-2 rounded-lg cursor-pointer">
                Logout
              </a>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
