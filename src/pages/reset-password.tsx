import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";

const RecoverPassowrdPage = () => {
  const apiClient = useApiClient();
  const router = useRouter();
  const urlSerch = new URLSearchParams(router.asPath.split("?")[1]);

  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      email: urlSerch.get("email") || "",
      otp: urlSerch.get("OTP") || "",
      password: "",
      repeatPassword: "",
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    await apiClient.auth.resetPassword(data);
    router.push(`/login?success=Password reset successfully, please login`);
  });

  return (
    <div className="mx-auto max-w-sm pt-10">
      <h1 className="mb-8 text-center text-2xl font-bold">
        Recover your password
      </h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <Input
          variant="bordered"
          label={`Email`}
          name="email"
          onChange={handleChange}
          error={errors.email}
          value={formData.email}
        />
        <Input
          variant="bordered"
          label={`OTP`}
          name="otp"
          onChange={handleChange}
          error={errors.otp}
          value={formData.otp}
        />
        <Input
          type="password"
          variant="bordered"
          label={`New passowrd`}
          name="password"
          onChange={handleChange}
          error={errors.password}
          value={formData.password}
        />
        <Input
          type="password"
          variant="bordered"
          label={`Repeat new password`}
          name="repeatPassword"
          onChange={handleChange}
          error={errors.repeatPassword}
          value={formData.repeatPassword}
        />

        <Button
          block
          disabled={disabled}
          type="submit"
          color="primary"
          loading={disabled}
          className="mt-4"
        >
          Recover now!
        </Button>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <a className="cursor-pointer text-blue-300 hover:underline">
              Signup
            </a>
          </Link>
        </p>
        <p className="mt-4 text-sm">
          Remember your password?{" "}
          <Link href="/login">
            <a className="cursor-pointer text-blue-300 hover:underline">
              Login
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RecoverPassowrdPage;
