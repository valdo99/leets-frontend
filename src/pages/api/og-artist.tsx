/* eslint-disable  */
import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@utils/dates";

export const config = {
  runtime: "experimental-edge",
};

export default function ogHome(req: NextRequest, res: NextResponse) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username");
  const name = searchParams.get("name");
  const createdAt = searchParams.get("createdAt");
  const monthlyListeners = searchParams.get("monthlyListeners");
  const artistImage = searchParams.get("artistImage");

  return new ImageResponse(
    (
      <div tw="h-full w-full flex items-start justify-start">
        <div tw="flex items-start justify-start h-full">
          <div
            tw="flex w-2/5 flex-col justify-between h-full pl-12 py-12"
            style={{ backgroundColor: "#050e1f" }}
          >
            <div tw="flex flex-col">
              <p tw="text-2xl mb-0 text-green-400 my-1">
                Scoperto da {username}
              </p>
              {createdAt && (
                <p tw="text-1xl mt-0 text-green-400">
                  Il {new Date(createdAt).toLocaleDateString()}
                </p>
              )}
              <h1 tw="text-5xl font-bold text-white text-left mt-0">{name}</h1>
            </div>
            <div tw="flex flex-col">
              <img
                tw="h-22"
                style={{ objectFit: "cover" }}
                src={`${req.nextUrl.origin}/logo.png`}
              />
            </div>
            <div tw="flex flex-col">
              <p tw="text-green-400 mb-1">Ascolti mensili</p>
              <p tw="text-3xl mt-0 font-bold bg-green-800 text-green-100 py-4 px-12 rounded-lg">
                {monthlyListeners}
              </p>
            </div>
          </div>
          {artistImage ? (
            <div tw="flex w-3/5 h-full">
              <img
                tw="w-full h-full"
                style={{ objectFit: "cover" }}
                src={artistImage}
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
