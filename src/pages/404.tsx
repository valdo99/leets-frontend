import Link from "next/link";

import { Button } from "@components/Basic/Button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-14">
      <h3 className="text-3xl font-bold">404 - Not Found</h3>
      <p className="text-lg">
        Are you lost? No worries, here&apos;s the way home
      </p>
      <Link href="/">
        <a>
          <Button>Go home</Button>
        </a>
      </Link>
    </div>
  );
}
