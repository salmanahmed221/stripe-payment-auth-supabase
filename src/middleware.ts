import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "./lib/supabase/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  await supabase.auth.getSession();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;

  const restrictedPaths = ["/"];
  const authPaths = ["/login"];

  if (authPaths.includes(path) && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (restrictedPaths.includes(path) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
