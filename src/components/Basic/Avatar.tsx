import cx from "classnames";
import Link from "next/link";

import { User } from "@api/users";
import { formatDate } from "@utils/dates";

interface AvatarProps {
  user: Pick<User, "name" | "surname" | "username" | "createdAt">;
  className?: string;
}

export const Avatar = ({ user, className }: AvatarProps) => {
  return (
    <div className={cx("flex items-center gap-2", className)}>
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-primary-content">
        <span>
          {user.name.charAt(0)}
          {user.surname.charAt(0)}
        </span>
      </div>
      <div>
        <Link href={`/${user.username}`}>
          <a className="font-bold hover:text-secondary-content/60">
            {user.username}
          </a>
        </Link>
        <p className="text-sm">Joined on {formatDate(user.createdAt)}</p>
      </div>
    </div>
  );
};
