import { Trans } from "@lingui/macro";
import cx from "classnames";
import Link from "next/link";

import { User } from "@api/users";
import { formatDate } from "@utils/dates";
import { stringToColour } from "@utils/stringToColor";

interface AvatarProps {
  user: Pick<User, "username" | "createdAt">;
  className?: string;
  onlyAvatar?: boolean;
  joinDate?: boolean;
  notifications?: number;
}

export const Avatar = ({
  user,
  className,
  onlyAvatar = false,
  joinDate = true,
  notifications,
}: AvatarProps) => {
  const color = stringToColour(user.username);
  console.log(notifications);

  return (
    <div className={cx("flex items-center space-x-2 text-left", className)}>
      <div
        style={{ backgroundColor: color }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-primary-content"
      >
        <span className="font-semibold uppercase">
          {notifications && notifications > 0 && (
            <span className=" absolute top-[-6px] left-6 mr-2 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
              {notifications}
            </span>
          )}
          {user.username.charAt(0)}
        </span>
      </div>
      {!onlyAvatar && (
        <div>
          <Link href={`/${user.username}`}>
            <a className="font-bold text-secondary-content hover:text-secondary-content/60">
              {user.username}
            </a>
          </Link>
          {joinDate && (
            <p className="text-sm">
              <Trans>Joined on {formatDate(user.createdAt)}</Trans>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
