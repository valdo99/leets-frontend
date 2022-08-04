import React from "react";
export default function ConfirmEmail() {
  React.useEffect(() => {
    if (window) {
      const token = new URLSearchParams(location.search).get("jwt");

      window.localStorage.setItem(
        "x-auth-token",
        JSON.stringify({
          token,
          isAdmin: false,
        })
      );
      window.location.href = "/";
    }
  }, []);

  return <p>loading</p>;
}
