/* eslint-disable  */
import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function ogHome(req: NextRequest, res: NextResponse) {
  const { searchParams } = req.nextUrl;
  const songImage = searchParams.get("songImage");
  const hunter = searchParams.get("hunter");
  const artist = searchParams.get("artist");
  const createdAt = searchParams.get("createdAt");
  const song = searchParams.get("song");

  return new ImageResponse(
    (
      <div tw="h-full w-full flex items-start justify-start">
        <div tw="flex items-start justify-start h-full">
          <div
            tw="flex w-2/5 flex-col justify-between h-full pl-12 py-12"
            style={{ backgroundColor: "#050e1f" }}
          >
            <div tw="flex flex-col">
              <p tw="text-2xl mb-0 text-green-400 my-1">Hunted by {hunter}</p>
              {createdAt && (
                <p tw="text-1xl mt-0 text-green-400">
                  at {new Date(createdAt).toLocaleDateString()}
                </p>
              )}
              <h1 tw="text-5xl font-bold text-white text-left mt-0">{song}</h1>
            </div>
            <div tw="flex flex-col">
              <img
                tw="h-22"
                style={{ objectFit: "cover" }}
                src={`${req.nextUrl.origin}/logo.png`}
              />
            </div>
            <div tw="flex flex-col">
              <p tw="text-green-400 mb-1">Artist:</p>
              <p tw="text-3xl mt-0 font-bold bg-green-800 text-green-100 py-4 px-12 rounded-lg">
                {artist}
              </p>
            </div>
          </div>
          {songImage ? (
            <div tw="flex w-3/5 h-full">
              <img
                tw="w-full h-full"
                style={{ objectFit: "cover" }}
                src={songImage}
              />
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
    }
  );
}
