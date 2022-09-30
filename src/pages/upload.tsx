import { Trans } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import { Post } from "@api/posts";
import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { SongCard } from "@components/Song/SongCard";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";
import { PageAuth, PageWithLayout } from "@types";

const UploadForm = ({ onSuccess }: { onSuccess: (post: Post) => void }) => {
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
    const spotifyId = data.spotifyUrl.replace(
      "https://open.spotify.com/track/",
      ""
    );
    const { data: post } = await apiClient.posts.uploadPreview(spotifyId);
    onSuccess(post);
  });

  return (
    <>
      <p className="mb-6 text-center text-base-content-neutral">
        <Trans>
          Remember, songs should be from artists who have less than X monthly
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
    </>
  );
};

interface UploadPreviewProps {
  post: Post;
  onSuccess: () => void;
}

const UploadPreview = ({ post, onSuccess }: UploadPreviewProps) => {
  const apiClient = useApiClient();

  const { mutate: confirmUpload } = useMutation(
    (spotifyId: string) =>
      apiClient.posts.upload(spotifyId).then((data) => data.data),
    {
      onSuccess() {
        toast.success("Song uploaded and under review");
      },
    }
  );

  const onConfirmUpload = () => {
    confirmUpload(post.spotify_id);
    onSuccess();
  };

  return (
    <>
      <p className="mb-6 text-center text-base-content-neutral">
        <Trans>Here&apos;s a preview of the song you are uploading</Trans>
      </p>
      <SongCard post={post} />
      <Button className="mt-6" onClick={onConfirmUpload}>
        <Trans>Confirm upload</Trans>
      </Button>
    </>
  );
};

const UploadSuccess = ({ post }: { post: Post }) => {
  return (
    <>
      <p className="text-base-content-neutral">
        <Trans>You have succesfully uploaded</Trans>
      </p>
      <h4 className="my-4 text-3xl font-bold">{post.title}</h4>
      <p className="text-base-content-neutral">
        <Trans>The song is under review</Trans>
      </p>
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
      <h1 className="mb-2 text-2xl font-bold">
        <Trans>Upload new song</Trans>
      </h1>
      <p className="mb-8 text-lg text-base-content-neutral">
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
      {step === UploadStep.Success && post && <UploadSuccess post={post} />}
    </div>
  );
};

UploadPage.auth = PageAuth.Private;

export default UploadPage;
