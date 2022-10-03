import { Trans } from "@lingui/macro";
import Link from "next/link";

import { Button } from "@components/Basic/Button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-14">
      <h3 className="text-3xl font-bold">
        <Trans>404 - Not Found</Trans>
      </h3>
      <p className="text-center text-lg">
        <Trans>Are you lost? No worries, here&apos;s the way home</Trans>
      </p>
      <Link href="/">
        <a>
          <Button>
            <Trans>Go home</Trans>
          </Button>
        </a>
      </Link>
    </div>
  );
}
