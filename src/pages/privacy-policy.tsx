import { NextSeo } from "next-seo";

import { DefaultLayout } from "@layouts/DefaultLayout";
import { PageWithLayout } from "@types";

const PrivacyPolicyPage: PageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <div className="mt-8 p-4 text-left">
        <h4 className="mb-2 text-2xl font-bold">Introduction</h4>
        <p>
          Leets is committed to protecting the privacy of our users. This
          privacy policy (“Policy”) sets out the types of information we collect
          from users of our website, how we use that information, and the steps
          we take to protect it.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Information We Collect</h4>
        <p>
          We may collect personal information from users of our website, such as
          name, email address, and other contact information. We may also
          collect information about users’ browsing activities on our website,
          including but not limited to pages visited, links clicked, and search
          queries.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Use of Cookies</h4>
        <p>
          We use cookies on our website to enhance users’ browsing experience
          and to collect information about their browsing activities. A cookie
          is a small text file that is placed on a user’s device by a website.
          Cookies allow us to remember users’ preferences, to understand how
          they interact with our website, and to improve our website’s
          performance.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Use of Information</h4>
        <p>
          We may use the information we collect from users of our website for
          the following purposes:
          <ul>
            <li>
              - To provide and improve the services offered on our website
            </li>
            <li>- To send users information about our products and services</li>
            <li>
              - To personalize the content and advertising that users see on our
              website
            </li>
            <li>
              - To understand how users interact with our website and to improve
              the user experience
            </li>
            <li>- To comply with legal and regulatory requirements</li>
          </ul>
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Sharing of Information</h4>
        <p>
          We do not share personal information with third parties, except as
          required by law or to protect our rights or the rights of others.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Security</h4>
        <p>
          We take appropriate security measures to protect against unauthorized
          access to or unauthorized alteration, disclosure, or destruction of
          data. We restrict access to personal information to our employees,
          contractors, and agents who need to know that information in order to
          operate, develop, or improve our website.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Changes to This Policy</h4>
        <p>
          We reserve the right to change this Policy at any time. Your continued
          use of our website after any changes to this Policy will be deemed to
          be your acceptance of such changes.
        </p>
        <h4 className="mt-6 mb-2 text-2xl font-bold">Contact Information</h4>
        <p>
          If you have any questions or comments about this Policy, please
          contact us at hey@leets.it. Please note that this is an example of a
          privacy and cookie policy, and it may need to be reviewed and modified
          as per your requirement and the laws that apply in your jurisdiction.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;

PrivacyPolicyPage.getLayout = (page) => (
  <DefaultLayout showFooter>{page}</DefaultLayout>
);
