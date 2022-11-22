import { Menu, Transition } from "@headlessui/react";
import { Trans } from "@lingui/macro";
import cx from "classnames";
import { Fragment } from "react";

import EnglishIcon from "@icons/en.svg";
import GlobeIcon from "@icons/globe.svg";
import ItalianIcon from "@icons/it.svg";
import { Locale } from "locales/available-locales";
import { dynamicActivateLanguage } from "locales/locale-provider";

interface LanguageMenuProps {
  className?: string;
  onClick?: () => void;
}

export const LanguageMenu = ({ onClick, className }: LanguageMenuProps) => {
  const changeLanguage = (lng: Locale) => {
    dynamicActivateLanguage(lng);
  };

  return (
    <Menu as="div" className={cx("relative", className)}>
      <Menu.Button className="block" onClick={onClick}>
        <GlobeIcon className="h-6 w-6" />
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
            "p-2",
            "rounded-btn",
            "bg-base-200",
            "shadow-lg drop-shadow-white ring-1 ring-white/10 shadow-white/10 focus:outline-none"
          )}
        >
          <Menu.Item>
            {({ active }) => (
              <button
                className={cx(
                  "rounded-btn flex cursor-pointer items-center py-2 px-4 font-medium hover:bg-secondary hover:text-secondary-content",
                  { "bg-secondary text-secondary-content": active }
                )}
                onClick={() => changeLanguage("it")}
              >
                <ItalianIcon className="text-xl" />
                <p className="ml-4 text-sm font-medium">
                  <Trans>Italian</Trans>
                </p>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={cx(
                  "rounded-btn flex cursor-pointer items-center py-2 px-4 font-medium hover:bg-secondary hover:text-secondary-content",
                  { "bg-secondary text-secondary-content": active }
                )}
                onClick={() => changeLanguage("en")}
              >
                <EnglishIcon className="text-xl" />
                <p className="ml-4 text-sm font-medium">
                  <Trans>English</Trans>
                </p>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
