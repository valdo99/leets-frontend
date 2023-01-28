import { Trans } from "@lingui/macro";
import cx from "classnames";
// import { GoogleAnalytics } from "nextjs-google-analytics";
import React, { useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@components/Basic/Button";
import { useHasMounted } from "@hooks/useHasMounted";
import { useLocalStorage } from "@hooks/useLocalStorage";

export const CookieConsent = () => {
  const hasMounted = useHasMounted();
  const [cookieConsent, setCookieConsent] = useLocalStorage<
    boolean | undefined
  >("cookie-consent", undefined);
  const [closing, setClosing] = useState(false);

  const close = (accepted: boolean) => {
    setClosing(true);
    setTimeout(() => setCookieConsent(accepted), 1000);
  };

  if (!hasMounted) return null;

  if (cookieConsent !== undefined) return null;

  // if (cookieConsent === true) {
  //   return <GoogleAnalytics trackPageViews />;
  // }

  // only client side (hasMounted) and no cookie consent set yet (cookieConsent === undefined)
  return createPortal(
    <div className="fixed inset-x-4 bottom-0 z-50 mb-4 flex justify-end">
      <div
        className={cx(
          "rounded-box w-[400px] bg-secondary p-4 text-secondary-content",
          "animate-slide-in-from-bottom",
          { "animate-slide-out-to-bottom": closing }
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="tablet:text-left mx-auto flex flex-col gap-2 text-center text-sm">
            <span>
              <Trans>
                We use cookies to enhance your browsing experience and to
                collect information for analytics and metrics about our visitors
                on this website.
              </Trans>
            </span>
          </div>

          <div className="flex flex-wrap justify-center">
            <Button onClick={() => close(true)}>
              <Trans>Accept</Trans>
            </Button>
            <Button
              onClick={() => close(false)}
              color="secondary"
              className="ml-4 border border-base-100 hover:border-base-100"
            >
              <Trans>Decline</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
