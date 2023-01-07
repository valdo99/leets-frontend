import { Trans } from "@lingui/macro";
import Link from "next/link";

export const AboutBanner = () => {
  return (
    <div className="rounded-btn bg-primary/40 p-4 text-center text-white">
      <Trans>Are you new here?</Trans>{" "}
      <Link href="/about">
        <a className="cursor-pointer font-medium underline">
          <Trans>Discover what is Leets</Trans>
        </a>
      </Link>
    </div>
  );
};
