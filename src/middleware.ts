import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DASHBOARD_LOGIN_URL,
  DASHBOARD_SIGNUP_URL,
  getAppUrl,
  getDashboardUrl,
} from "@/config/urls";

/** Marketing site: auth lives on the dashboard - redirect legacy routes when hosts differ. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (getDashboardUrl() !== getAppUrl()) {
    if (pathname === "/login") {
      return NextResponse.redirect(DASHBOARD_LOGIN_URL);
    }

    if (pathname === "/signup") {
      return NextResponse.redirect(DASHBOARD_SIGNUP_URL);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/login", "/signup"],
};
