import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";

export default function UploadPage() {
  const apiClient = useApiClient();
  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      spotifyUrl: "",
    },
    {
      resetOnSuccess: true,
      successMessage: "Song uploaded!",
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    const spotifyId = data.spotifyUrl.replace(
      "https://open.spotify.com/track/",
      ""
    );
    console.log(spotifyId);
    await apiClient.posts.upload(spotifyId);
  });

  return (
    <div className="flex flex-col items-center pt-12">
      <h1 className="mb-2 text-2xl font-bold">Upload new song</h1>
      <p className="mb-8 text-lg text-base-content/50">
        Be the hunter of the next hit
      </p>
      <form
        className="flex w-full max-w-[360px] flex-col gap-3"
        onSubmit={onSubmit}
      >
        <Input
          placeholder="Spotify url"
          variant="bordered"
          name="spotifyUrl"
          value={formData.spotifyUrl}
          onChange={handleChange}
          error={errors.spotifyUrl}
        />
        <Button type="submit" loading={disabled}>
          Upload
        </Button>
      </form>
    </div>
  );
}
