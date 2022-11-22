import { Trans } from "@lingui/macro";

import { Button } from "@components/Basic/Button";

export const ContactSection = () => {
  return (
    <section className="mt-36 mb-20 text-center">
      <h3 className="text-2xl font-bold">
        <Trans>
          Get in <span className="text-primary">touch</span>
        </Trans>
      </h3>
      <p className="mx-auto mt-4 max-w-[34rem] text-lg text-base-content-neutral">
        <Trans>
          Have any feedback? Want to collaborate? Or just want to say hi and
          talk about music? We look forward to hearing from you!
        </Trans>
      </p>

      <a href="mailto:edvaldogjonikaj@gmail.com">
        <Button size="lg" className="mt-10">
          <Trans>Contact us</Trans>
        </Button>
      </a>
    </section>
  );
};
