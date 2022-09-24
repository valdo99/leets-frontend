import { GetStaticPaths, GetStaticProps } from "next";

import { ApiClient } from "@api/client";
import { User } from "@api/users";
import { PageWithLayout } from "@types";

const UserPage: PageWithLayout<{ user: User }> = ({ user }) => {
  return (
    <>
      <p>{user.username}</p>
      <p>{user.name}</p>
      <p>{user.surname}</p>
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
