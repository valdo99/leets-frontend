import { Trans } from "@lingui/macro";
import { NextSeo } from "next-seo";

export default function AboutPage() {
  return (
    <>
      <NextSeo title={`Leets | About`} />
      <div className="mt-10 flex flex-col gap-6">
        <div>
          <h1 className="mb-4 text-3xl font-bold leading-tight">
            <Trans>What is Leets</Trans>
          </h1>
          <p className="text-lg text-base-content-neutral">
            <Trans>
              Leets is the platform where you can{" "}
              <span className="text-primary">
                share your musical discoveries{" "}
              </span>
              and <span className="text-primary">promote emerging artists</span>
              . Anyone can upload a song and share it, helping the artist to
              gain exposure.
            </Trans>
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-xl font-bold">
            <Trans>Leets for hunters</Trans>
          </h3>
          <p className="text-lg text-base-content-neutral">
            <Trans>
              Has it ever happened to you to discover a little-known artist,
              who, however, in your opinion deserves much more following? And
              maybe after a few years all your friends listen to him/her and
              he/she&apos;s even on the radio. We call{" "}
              <span className="text-primary">hunters</span> those people who
              discover artists before anyone else. If you are a hunter, with
              Leets you can share your musical discoveries, and one day if the
              artist is famous you will even have proof that you discovered
              him/her well in advance!
              <br />
              But keep in mind, only one user can be the hunter of a song. So as
              soon as you have a new discovery, hurry up and upload it!
            </Trans>
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-xl font-bold">
            <Trans>Leets for artists</Trans>
          </h3>
          <p className="text-lg text-base-content-neutral">
            <Trans>
              Leets also aims to promote{" "}
              <span className="text-primary">emerging artists</span>. In fact,
              only songs by artists who have less than 35000 monthly listeners
              on Spotify can be uploaded. In this way we want to give visibility
              to those artists who are talented but do not yet have the
              following they deserve.
            </Trans>
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-xl font-bold">
            <Trans>Leets for discovering new music</Trans>
          </h3>
          <p className="text-lg text-base-content-neutral">
            <Trans>
              With Leets you can{" "}
              <span className="text-primary">discover new music daily</span> by
              up-and-coming artists, which may be harder to find on other
              platforms like Spotify. Every day you will be able to see a
              ranking of the songs that received the most &quot;likes&quot; from
              users during the day.
            </Trans>
          </p>
        </div>
      </div>
    </>
  );
}
