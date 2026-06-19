import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DASHBOARD_LOGIN_URL,
  DASHBOARD_SIGNUP_URL,
  getAppUrl,
  getDashboardUrl,
} from "@/config/urls";

/** Marketing site: auth lives on the dashboard — redirect legacy routes when hosts differ. */
export function middleware(request: NextRequest) {
  if (getDashboardUrl() === getAppUrl()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    return NextResponse.redirect(DASHBOARD_LOGIN_URL);
  }

  if (pathname === "/signup") {
    return NextResponse.redirect(DASHBOARD_SIGNUP_URL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
