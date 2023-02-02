const title = "Leets - Discover the next big hits in music";
const description = "Share and discover the best new emerging music daily";
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
