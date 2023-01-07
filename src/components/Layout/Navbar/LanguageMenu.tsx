import { Menu } from "@headlessui/react";
import { Trans } from "@lingui/macro";
import cx from "classnames";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@components/Basic/Dropdown";
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
    <Dropdown className={cx("inline-flex", className)}>
      <DropdownTrigger onClick={onClick}>
        <GlobeIcon className="h-6 w-6" />
      </DropdownTrigger>
      <DropdownContent className="mt-6 min-w-0">
        <Menu.Item>
          <DropdownItem onClick={() => changeLanguage("en")}>
            <ItalianIcon className="text-xl" />
            <p className="ml-4 text-sm font-medium">
              <Trans>Italian</Trans>
            </p>
          </DropdownItem>
        </Menu.Item>
        <Menu.Item>
          <DropdownItem onClick={() => changeLanguage("en")}>
            <EnglishIcon className="text-xl" />
            <p className="ml-4 text-sm font-medium">
              <Trans>English</Trans>
            </p>
          </DropdownItem>
        </Menu.Item>
      </DropdownContent>
    </Dropdown>
  );
};
