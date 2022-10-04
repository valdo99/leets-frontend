import { NextSeo } from "next-seo";
import Head from "next/head";

import { Feed } from "@components/Feed";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Leets"
        description="Condividi le tue scoperte musicali e promuovi artisti emergenti"
        canonical="https://www.leets.it/"
        openGraph={{
          url: "https://www.leets.it",
          title: "Leets",
          description:
            "Condividi le tue scoperte musicali e promuovi artisti emergenti",
          images: [
            {
              url: "https://beta.leets.it/logo.png",
              width: 800,
              height: 600,
              alt: "Leets logo",
              type: "image/png",
            },
          ],
          site_name: "Leets",
        }}
      />
      <Head>
        <title>Leets</title>
      </Head>
      <Feed />
    </>
  );
}
