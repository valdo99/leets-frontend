import { ReactNode } from "react";

import type { NextPage } from "next";

export enum PageAuth {
  Admin,
  Private,
  UnPrivate,
}

export type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
  auth?: PageAuth;
};
