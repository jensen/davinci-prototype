import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "utils/jwt";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("alicent_auth")?.value;

  if (jwt) {
    const user = await verify(jwt);

    if (user) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/api/users", "/api/prompt"],
};
