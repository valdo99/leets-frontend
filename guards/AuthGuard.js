import { useUser } from "../providers/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

const checkAccess = (user, auth) => {
  switch (auth) {
    case "PRIVATE":
      if (user) return [true, ""];
      return [false, "/login"];

    default:
      return [true, ""];
  }
};

const requiresLoading = (auth) => {
  switch (auth) {
    case "PRIVATE":
      return true;
    case "PUBLIC":
      return false;
    default:
      return false;
  }
};

const AuthGuard = ({ auth, children }) => {
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
export default AuthGuard;
