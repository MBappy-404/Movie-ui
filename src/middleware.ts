import { getCurrentUser } from "@/services/AuthServices";
import { NextRequest, NextResponse } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/dashboard/, /^\/profile/],
};


export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  const role = userInfo?.role as Role;
  const allowedRoutes = roleBasedPrivateRoutes[role];

  if (allowedRoutes && allowedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set("accessToken", "", { maxAge: 0 }); // Or your actual token key
  return response;
};

export const config = {
  matcher: [
    '/login',
    '/profile',
    '/dashboard',
    "/dashboard/:page*"
  ],
};