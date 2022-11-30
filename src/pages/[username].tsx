import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiClient } from "@api/client";
import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { TabItem, Tabs } from "@components/Basic/Tabs";
import { EditUsernameModal } from "@components/Modals/EditUsernameModal";
import { UserHuntedArtists } from "@components/UserHuntedArtists";
import { UserHuntedSongs } from "@components/UserHuntedSongs";
import { UserLikedSongs } from "@components/UserLikedSongs";
import EditIcon from "@icons/edit.svg";
import { userAtom } from "@state/user";
import { PageWithLayout } from "@types";

import SEO from "../../next-seo.config";

const UserPageInner = ({ user }: { user: User }) => {
  const { i18n } = useLingui();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [{ user: loggedUser }] = useAtom(userAtom);

  const tabItems: TabItem[] = [
    {
      label: t(i18n)`Hunted songs`,
      content: (
        <div className="mt-8">
          <UserHuntedSongs user={user} />
        </div>
      ),
    },
    {
      label: t(i18n)`Hunted artists`,
      content: (
        <div className="mt-8">
          <UserHuntedArtists user={user} />
        </div>
      ),
    },
    {
      label: t(i18n)`Liked songs`,
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
      <div className="mt-8 mb-6 flex items-center space-x-3">
        <h3 className="text-2xl font-bold md:text-3xl">{user.username}</h3>
        {user.username === loggedUser?.username && (
          <button onClick={() => setShowUpdateModal(true)}>
            <EditIcon className="h-5 w-5 text-base-content-neutral hover:text-base-content" />
          </button>
        )}
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
