/* eslint-disable  */
import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
};

export default function ogHome(req: NextApiRequest, res: NextApiResponse) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#050e1f",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`} />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
