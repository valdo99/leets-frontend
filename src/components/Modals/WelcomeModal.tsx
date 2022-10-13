import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import React, { useEffect, useState } from "react";

import { Button } from "@components/Basic/Button";
import { Modal } from "@components/Basic/Modal";

export const WelcomeModal = () => {
  const [show, setShow] = useState(false);
  const { i18n } = useLingui();

  const close = () => {
    setShow(false);
    window.localStorage.setItem("welcome", "true");
  };

  useEffect(() => {
    if (window) {
      const isSeen = window.localStorage.getItem("welcome");
      if (!isSeen) setShow(true);
    }
  }, []);

  return (
    <Modal show={show} onClose={close} title={t(i18n)`Welcome on Leets`}>
      <p>
        <Trans>
          <strong>Leets</strong> is the platform where you can{" "}
          <strong>share</strong> your music discoveries and{" "}
          <strong>promote emergent artists</strong>.
        </Trans>
      </p>
      <p className="mt-2">
        <Trans>
          To get started, sign up and upload the <strong>Spotify link</strong>{" "}
          of the song you wish to share with the community
        </Trans>
      </p>
      <p className="mt-2">
        <Trans>
          Remember that we do <strong>NOT</strong> own any copyright of images
          and song/artist information. All data is provided by{" "}
          <a
            href="https://spotify.com"
            className="font-bold underline underline-offset-2"
          >
            Spotify
          </a>
        </Trans>
      </p>
      <Button className="float-right mt-5" onClick={close}>
        <Trans>Get started</Trans>
      </Button>
    </Modal>
  );
};
