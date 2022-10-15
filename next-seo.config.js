const title = "Leets - Condividi le tue scoperte musicali";
const description =
  "Condividi le tue scoperte musicali e promuovi artisti emergenti";
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
        alt: "Mattia Pomelli",
        type: "image/png",
      },
    ],
  },
};

export default SEO;
