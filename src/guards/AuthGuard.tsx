import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { User } from "@api/users";
import { useUser } from "@providers/AuthProvider";
import { PageAuth } from "@types";

const checkAccess = (user: User | null, auth?: PageAuth): [boolean, string] => {
  switch (auth) {
    case PageAuth.Private:
      if (user) return [true, ""];
      return [false, "/"];

    default:
      return [true, ""];
  }
};

const requiresLoading = (auth?: PageAuth) => {
  switch (auth) {
    case PageAuth.Private:
      return true;
    default:
      return false;
  }
};

interface AuthGuardProps {
  auth?: PageAuth;
  children: ReactNode;
}

export const AuthGuard = ({ auth, children }: AuthGuardProps) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const [hasAccess, redirectTo] = checkAccess(user, auth);

    if (!hasAccess) {
      router.push(redirectTo);
    }
  }, [user, loading, auth, router]);

  if (!checkAccess(user, auth)[0] && requiresLoading(auth)) {
    return null;
  }

  return <>{children}</>;
};
