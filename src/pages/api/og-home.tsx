/* eslint-disable  */
import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function ogHome(req: NextRequest, res: NextResponse) {
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
        <img src={`${req.nextUrl.origin}/logo_only.png`} />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
