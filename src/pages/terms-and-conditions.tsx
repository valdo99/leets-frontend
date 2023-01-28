import { NextSeo } from "next-seo";

import { DefaultLayout } from "@layouts/DefaultLayout";
import { PageWithLayout } from "@types";

const TermsAndConditionsPage: PageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <div className="mt-8 text-left">
        <h4 className="mb-2 text-2xl font-bold">Introduction</h4>
        <p>
          Welcome to Leets! By accessing or using our website, you agree to be
          bound by these terms of service (“Terms”). If you do not agree to
          these Terms, you may not access or use the Leets website.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Account Creation</h4>
        <p>
          In order to access certain features of the Leets website, you may be
          required to create an account. You agree to provide accurate and
          complete information when creating your account, and to update your
          account information as necessary. You are responsible for maintaining
          the confidentiality of your account login information and are fully
          responsible for all activities that occur under your account.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">User Content</h4>
        <p>
          Leets allows users to post content to the website, including but not
          limited to text, images, and videos (“User Content”). By posting User
          Content, you grant Leets a non-exclusive, royalty-free, perpetual,
          irrevocable, and fully sublicensable right to use, reproduce, modify,
          adapt, publish, translate, create derivative works from, distribute,
          and display such User Content throughout the world in any media. You
          represent and warrant that you own or have the necessary rights to
          post the User Content and that it does not violate any intellectual
          property rights or any other laws.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Prohibited Use</h4>
        <p>
          You agree not to use the Leets website for any illegal or unauthorized
          purpose, or to post or transmit any content that is harmful,
          threatening, abusive, harassing, defamatory, vulgar, obscene, invasive
          of another&apos;s privacy, or racially, ethnically, or otherwise
          objectionable. You also agree not to use the Leets website to post or
          transmit any content that is illegal, including but not limited to,
          copyrighted material, trademark infringement, or any other proprietary
          rights violations.
        </p>
        <h4>Limitation of Liability</h4>
        <p>
          Leets shall not be liable for any damages, including but not limited
          to, direct, indirect, incidental, special, consequential, or punitive
          damages, arising out of or in connection with the use or inability to
          use the Leets website or any content or services provided on the Leets
          website.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Changes to These Terms</h4>
        <p>
          Leets reserves the right to change these Terms at any time. Your
          continued use of the Leets website after any changes to these Terms
          will be deemed to be your acceptance of such changes.
        </p>
        <h4>Governing Law</h4>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Italy, without giving effect to any principles of conflicts of
          law.
        </p>
        <h4>Contact Information</h4>
        <p>
          If you have any questions or comments about these Terms, please
          contact us at hey@leets.it. Please note that this is an example of
          terms of service and need to be reviewed and modified as per your
          requirement.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;

TermsAndConditionsPage.getLayout = (page) => (
  <DefaultLayout showFooter>{page}</DefaultLayout>
);
