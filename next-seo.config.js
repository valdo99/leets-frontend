const title = "Leets - Discover new up-and-coming music daily";
const description =
  "Share and prove your musical discoveries of up-and-coming talents, supporting their growth";
const url = "https://leets.it";
const image = `https://www.leets.it/api/og-home`;

const SEO = {
  title,
  description,
  canonical: url,
  openGraph: {
    type: "website",
    locale: "en_IE",
    title,
    description,
    images: [
      {
        url: image,
        alt: "Leets",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@leetsapp",
    site: "@leetsapp",
    cardType: "summary_large_image",
  },
};

export default SEO;
