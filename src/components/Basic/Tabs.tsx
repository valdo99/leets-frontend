import { Tab } from "@headlessui/react";
import cx from "classnames";
import { Fragment, ReactNode } from "react";

export interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export const Tabs = ({ items, className }: TabsProps) => {
  return (
    <Tab.Group>
      <Tab.List
        className={cx(
          "grid grid-cols-[repeat(auto-fill,_minmax(8.75rem,_1fr))] gap-2",
          className
        )}
      >
        {items.map((item) => (
          <Tab key={item.label?.toString()} as={Fragment}>
            {({ selected }) => (
              <button
                className={cx(
                  "rounded-btn",
                  "text-sm font-medium",
                  "py-2.5",
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
