import { Tab } from "@headlessui/react";
import cx from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment, ReactNode } from "react";

import { ApiClient } from "@api/client";
import { User } from "@api/users";
import { UserLikedSongs } from "@components/UserLikedSongs";
import { PageWithLayout } from "@types";

interface TabItem {
  label: string;
  content: ReactNode;
}

const tabs: TabItem[] = [
  {
    label: "Liked",
    content: <UserLikedSongs />,
  },
  {
    label: "Hunted",
    content: <div>Hunted songs</div>,
  },
];

const UserPage: PageWithLayout<{ user: User }> = ({ user }) => {
  return (
    <>
      <h3 className="mt-8 mb-6 text-2xl font-bold">{user.username}</h3>
      <Tab.Group>
        <Tab.List className="flex gap-2">
          {tabs.map((tab) => (
            <Tab key={tab.label} as={Fragment}>
              {({ selected }) => (
                <button
                  className={cx(
                    "rounded-lg",
                    "text-sm font-medium",
                    "py-2.5 min-w-[140px]",
                    "focus:outline-none",
                    "focus:ring-4",
                    "ring-primary ring-opacity-50",
                    selected
                      ? "bg-secondary text-secondary-content shadow"
                      : "bg-base-200 text-text-primary"
                  )}
                >
                  {tab.label}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.label}>{tab.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default UserPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const username = params?.username?.toString() || "";

    const apiClient = new ApiClient();
    const { data: user } = await apiClient.users.read(username);

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
