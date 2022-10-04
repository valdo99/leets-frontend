import { Trans } from "@lingui/macro";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Fragment, ReactNode } from "react";

import { ApiClient } from "@api/client";
import { User } from "@api/users";
import { Tabs } from "@components/Basic/Tabs";
import { UserHuntedSongs } from "@components/UserHuntedSongs";
import { UserLikedSongs } from "@components/UserLikedSongs";
import { PageWithLayout } from "@types";

interface TabItem {
  label: ReactNode;
  content: ReactNode;
}

const UserPage: PageWithLayout<{ user: User }> = ({ user }) => {
  const tabItems: TabItem[] = [
    {
      label: <Trans>Liked</Trans>,
      content: (
        <div className="mt-8">
          <UserLikedSongs user={user} />
        </div>
      ),
    },
    {
      label: <Trans>Hunted</Trans>,
      content: (
        <div className="mt-8">
          <UserHuntedSongs user={user} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Leets | {user.username}</title>
      </Head>
      <h3 className="mt-8 mb-6 text-2xl font-bold">{user.username}</h3>
      <Tabs items={tabItems} />
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
