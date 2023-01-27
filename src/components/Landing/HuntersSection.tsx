import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@components/Basic/Button";
import DocumentIcon from "@icons/document.svg";
import ShareIcon from "@icons/share.svg";
import TrophyIcon from "@icons/trophy.svg";
import { useUser } from "@providers/AuthProvider";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="rounded-btn flex flex-1 flex-col items-center bg-secondary p-4 md:p-8">
      <div className="mb-4 text-4xl text-primary">{icon}</div>
      <h4 className="text-center text-xl font-bold text-secondary-content">
        {title}
      </h4>
      <p className="text-center text-secondary-content">{description}</p>
    </div>
  );
};

export const HuntersSection = () => {
  const { i18n } = useLingui();
  const { user } = useUser();

  return (
    <section className="mt-28 text-center">
      <h3 className="text-2xl font-bold sm:text-3xl">
        <Trans>
          Are you a music <span className="text-primary">hunter</span>?
        </Trans>
      </h3>
      <p className="mx-auto mt-4 max-w-[40rem] text-lg text-base-content-neutral">
        <Trans>
          Do you often discover talented artists when they are not yet popular?
          Leets is the perfect place to share your musical discoveries with
          other people like you.
        </Trans>
      </p>
      <div className="mt-10 flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        <FeatureCard
          title={t(i18n)`Share`}
          description={t(
            i18n
          )`Share your new musical discoveries with everyone`}
          icon={<ShareIcon />}
        />
        <FeatureCard
          title={t(i18n)`Support`}
          description={t(
            i18n
          )`Support the emergent artists you love and help them to grow`}
          icon={<TrophyIcon />}
        />
        <FeatureCard
          title={t(i18n)`Prove`}
          description={t(
            i18n
          )`Prove that you have discovered an artist at a certain date`}
          icon={<DocumentIcon />}
        />
      </div>
      <Link href={user ? "/upload" : "/signup"}>
        <Button size="lg" className="mt-10">
          <Trans>Hunt the next hit</Trans>
        </Button>
      </Link>
    </section>
  );
};
