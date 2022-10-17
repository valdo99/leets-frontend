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
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#050e1f",
          rowGap: "1.5rem",
          color: "white",
          paddingLeft: "1.5rem",
        }}
      >
        <div style={{ width: "35%", display: "flex" }}>
          <img height="80px" src="https://www.leets.it/logo.png" />
        </div>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <span style={{ alignItems: "center" }}>
            {artistImage && (
              <img
                height="150px"
                style={{ borderRadius: "100%", paddingRight: "12px" }}
                src={artistImage}
              />
            )}

            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 28 }}>{name}</span>
              <span style={{ fontSize: "14px" }}>
                Hunted by{" "}
                <span style={{ paddingLeft: "4px", fontWeight: 700 }}>
                  {username}
                </span>
              </span>
              <span style={{ fontSize: "14px" }}>
                Monthly listeners:{" "}
                <span style={{ paddingLeft: "4px", fontWeight: 700 }}>
                  {monthlyListeners}
                </span>
              </span>
              <span style={{ fontSize: "14px" }}>
                Hunted at{" "}
                <span style={{ paddingLeft: "4px", fontWeight: 700 }}>
                  {createdAt}
                </span>
              </span>
            </span>
          </span>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
    }
  );
}
