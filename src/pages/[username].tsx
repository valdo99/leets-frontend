import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiClient } from "@api/client";
import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { TabItem, Tabs } from "@components/Basic/Tabs";
import { EditUsernameModal } from "@components/Modals/EditUsernameModal";
import { UserHuntedSongs } from "@components/UserHuntedSongs";
import { UserLikedSongs } from "@components/UserLikedSongs";
import EditIcon from "@icons/edit.svg";
import { PageWithLayout } from "@types";

import SEO from "../../next-seo.config";

const UserPageInner = ({ user }: { user: User }) => {
  const { i18n } = useLingui();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const tabItems: TabItem[] = [
    {
      label: t(i18n)`Hunted`,
      content: (
        <div className="mt-8">
          <UserHuntedSongs user={user} />
        </div>
      ),
    },
    {
      label: t(i18n)`Liked`,
      content: (
        <div className="mt-8">
          <UserLikedSongs user={user} />
        </div>
      ),
    },
  ];

  return (
    <>
      <NextSeo {...SEO} title={`Leets | ${user.username}`} />
      <div className="mt-8 mb-6 flex items-center gap-2">
        <h3 className="text-2xl font-bold md:text-3xl">{user.username}</h3>
        <button onClick={() => setShowUpdateModal(true)}>
          <EditIcon className="h-6 w-6" />
        </button>
      </div>

      <Tabs items={tabItems} />
      <EditUsernameModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
    </>
  );
};

const UserPage: PageWithLayout<{ user: User }> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-20 w-20" />
      </div>
    );
  }

  return <UserPageInner user={user} />;
};

export default UserPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username?.toString() || "";

  const apiClient = new ApiClient();
  const { data: user } = await apiClient.users.read(username);

  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
