import { Trans } from "@lingui/macro";
import cx from "classnames";
import Link from "next/link";

import { User } from "@api/users";
import { formatDate } from "@utils/dates";
import { stringToColour } from "@utils/stringToColor";

interface AvatarProps {
  user: Pick<User, "name" | "surname" | "username" | "createdAt">;
  className?: string;
  onlyAvatar?: boolean;
}

export const Avatar = ({
  user,
  className,
  onlyAvatar = false,
}: AvatarProps) => {
  const color = stringToColour(user.username);

  return (
    <div className={cx("flex items-center gap-2 text-left", className)}>
      <div
        style={{ backgroundColor: color }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-primary-content"
      >
        <span className="uppercase">
          {user.name.charAt(0)}
          {user.surname.charAt(0)}
        </span>
      </div>
      {!onlyAvatar && (
        <div>
          <Link href={`/${user.username}`}>
            <a className="font-bold text-secondary-content hover:text-secondary-content/60">
              {user.username}
            </a>
          </Link>
          <p className="text-sm">
            <Trans>Joined on {formatDate(user.createdAt)}</Trans>
          </p>
        </div>
      )}
    </div>
  );
};
