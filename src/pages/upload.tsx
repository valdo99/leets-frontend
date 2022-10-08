import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import { Post } from "@api/posts";
import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { Tabs } from "@components/Basic/Tabs";
import { SongCard } from "@components/Song/SongCard";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";
import { PageAuth, PageWithLayout } from "@types";

const UploadForm = ({ onSuccess }: { onSuccess: (post: Post) => void }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      spotifyUrl: "",
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    if (!data.spotifyUrl.startsWith("https://open.spotify.com/track/")) {
      toast.error(i18n._(t`Invalid Song URL`));
      throw Error();
    }

    const spotifyId = data.spotifyUrl
      .replace("https://open.spotify.com/track/", "")
      .split("?")[0];

    console.log(spotifyId);

    const { data: post } = await apiClient.posts.uploadPreview(spotifyId);
    onSuccess(post);
  });

  return (
    <>
      <Head>
        <title>Leets | Upload song</title>
      </Head>
      <p className="mb-6 text-center text-base-content-neutral">
        <Trans>
          Remember, songs should be by artists who have less than 35.000 monthly
          listeners on Spotify
        </Trans>
      </p>

      <form className="flex w-full gap-2" onSubmit={onSubmit}>
        <Input
          placeholder="Spotify url"
          block
          variant="bordered"
          name="spotifyUrl"
          value={formData.spotifyUrl}
          onChange={handleChange}
          error={errors.spotifyUrl}
          className="flex-1"
        />
        <Button type="submit" loading={disabled}>
          <Trans>Upload</Trans>
        </Button>
      </form>

      <hr className="my-12 h-px border-0 bg-base-content-neutral" />

      <h5 className="mb-4 text-center font-bold">
        <Trans>How to get song url</Trans>
      </h5>
      <Tabs
        className="flex justify-center"
        items={[
          {
            label: t(i18n)`Desktop`,
            content: (
              <Image
                src="/tutorial-upload.png"
                alt="Upload tutorial"
                width={567}
                height={375}
              />
            ),
          },
          {
            label: t(i18n)`Mobile`,
            content: (
              <div className="text-center">
                <Image
                  src="/tutorial-upload-mobile.gif"
                  alt="Upload tutorial"
                  width={300}
                  height={636}
                />
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

interface UploadPreviewProps {
  post: Post;
  onSuccess: () => void;
}

const UploadPreview = ({ post, onSuccess }: UploadPreviewProps) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const { mutate: confirmUpload } = useMutation(
    (spotifyId: string) =>
      apiClient.posts.upload(spotifyId).then((data) => data.data),
    {
      onSuccess() {
        toast.success(t(i18n)`Song uploaded! 🚀`);
        onSuccess();
      },
      onError() {
        toast.error(t(i18n)`Something went wrong, please retry later`);
      },
    }
  );

  const onConfirmUpload = () => {
    confirmUpload(post.spotify_id);
  };

  return (
    <>
      <p className="mb-6 text-center text-base-content-neutral">
        <Trans>Here&apos;s a preview of the song you are uploading</Trans>
      </p>
      <SongCard post={post} showHunter={false} />
      <Button className="mt-6" onClick={onConfirmUpload}>
        <Trans>Confirm upload</Trans>
      </Button>
    </>
  );
};

interface UploadPreviewProps {
  post: Post;
  onSuccess: () => void;
}

const UploadSuccess = ({ post, onSuccess }: UploadPreviewProps) => {
  return (
    <>
      <p className="text-base-content-neutral">
        <Trans>You have succesfully uploaded</Trans>
      </p>
      <h4 className="my-4 text-3xl font-bold">{post.title}</h4>
      <Button className="mt-6" onClick={onSuccess}>
        <Trans>Upload another song</Trans>
      </Button>
    </>
  );
};

enum UploadStep {
  Form,
  Preview,
  Success,
}

const UploadPage: PageWithLayout = () => {
  const [step, setStep] = useState(UploadStep.Form);
  const [post, setPost] = useState<Post | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col items-center pt-12">
      <h1 className="mb-2 text-center text-2xl font-bold">
        <Trans>Upload new song</Trans>
      </h1>
      <p className="mb-8 text-center text-lg text-base-content-neutral">
        <Trans> Be the hunter of the next hit</Trans>
      </p>
      {step === UploadStep.Form && (
        <UploadForm
          onSuccess={(post) => {
            setPost(post), setStep(UploadStep.Preview);
          }}
        />
      )}
      {step === UploadStep.Preview && post && (
        <UploadPreview
          post={post}
          onSuccess={() => setStep(UploadStep.Success)}
        />
      )}
      {step === UploadStep.Success && post && (
        <UploadSuccess post={post} onSuccess={() => setStep(UploadStep.Form)} />
      )}
    </div>
  );
};

UploadPage.auth = PageAuth.Private;

export default UploadPage;
