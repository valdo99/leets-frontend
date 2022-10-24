import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { Modal } from "@components/Basic/Modal";
import { BaseModalProps } from "@components/Basic/Modal/Modal";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";
import { userAtom } from "@state/user";

export const EditUsernameModal = ({ show, onClose }: BaseModalProps) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();

  const { handleChange, handleSubmit, errors, disabled } = useForm(
    {
      username: "",
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    await apiClient.users.update(data);
    const loggedUser = await apiClient.auth.getLoggedUser();

    setUser({
      user: loggedUser,
      loading: false,
    });
    router.push(`/${loggedUser?.username}`);
    onClose();
  });

  return (
    <Modal show={show} onClose={onClose} title={t(i18n)`Update your username`}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input
          placeholder={t(i18n)`Username`}
          variant="bordered"
          name="username"
          onChange={handleChange}
          error={errors.username}
        />

        <Button
          block
          disabled={disabled}
          type="submit"
          color="primary"
          loading={disabled}
          className="mt-4"
        >
          <Trans>Update</Trans>
        </Button>
      </form>
    </Modal>
  );
};
