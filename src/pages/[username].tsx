import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { ApiClient } from "@api/client";
import { User } from "@api/users";
import { TabItem, Tabs } from "@components/Basic/Tabs";
import { UserHuntedSongs } from "@components/UserHuntedSongs";
import { UserLikedSongs } from "@components/UserLikedSongs";
import { PageWithLayout } from "@types";

const UserPage: PageWithLayout<{ user: User }> = ({ user }) => {
  const { i18n } = useLingui();

  const tabItems: TabItem[] = [
    {
      label: t(i18n)`Liked`,
      content: (
        <div className="mt-8">
          <UserLikedSongs user={user} />
        </div>
      ),
    },
    {
      label: t(i18n)`Hunted`,
      content: (
        <div className="mt-8">
          <UserHuntedSongs user={user} />
        </div>
      ),
    },
  ];

  const title = `Leets | ${user.username}`;

  return (
    <>
      <Head>
        <title>{title}</title>
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
