import { NextResponse } from "next/server";
import { verify } from "utils/jwt";

import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("alicent_auth")?.value;

  if (jwt) {
    try {
      const user = await verify(jwt);

      if (user) {
        return NextResponse.next();
      }
    } catch (error) {
      const content = request.headers.get("Content-Type");

      if (content) {
        if (content === "application/json") {
          return NextResponse.redirect(new URL("/api/errors/401", request.url));
        }
      }
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/api/users", "/api/prompt"],
};
