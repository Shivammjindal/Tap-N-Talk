import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";

export default withAuth({
  pages: {
    signIn: "/"
  }
});

export const config = {
  matcher: [
    "/update/:path*",
    "/users/:path*",
    "/conversations/:path*"
  ]
};

export function middleware(req: NextRequest){
  console.log("url",req.nextUrl)
  const res = NextResponse.next()
  res.headers.append('ACCESS-CONTROL-ALLOW-ORIGIN','*')
  return res
} 