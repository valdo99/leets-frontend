import { Tab } from "@headlessui/react";
import cx from "classnames";
import { Fragment, ReactNode } from "react";

interface TabItem {
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export const Tabs = ({ items, className }: TabsProps) => {
  return (
    <Tab.Group>
      <Tab.List className={cx("flex gap-2", className)}>
        {items.map((item) => (
          <Tab key={item.label?.toString()} as={Fragment}>
            {({ selected }) => (
              <button
                className={cx(
                  "rounded-btn",
                  "text-sm font-medium",
                  "py-2.5 min-w-[140px]",
                  "focus:outline-none",
                  "focus-visible:ring-4",
                  "focus:ring-primary focus:ring-opacity-50",
                  selected
                    ? "bg-secondary text-secondary-content shadow"
                    : "bg-base-200 text-text-primary hover:opacity-80"
                )}
              >
                {item.label}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {items.map((item) => (
          <Tab.Panel key={item.label?.toString()}>{item.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
