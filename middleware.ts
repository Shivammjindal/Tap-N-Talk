import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";

export default withAuth({
  pages: {
    signIn: "/"
  }
});

export function middleware(req: NextRequest){
  console.log("url",req.nextUrl)
  const res = NextResponse.next()
  res.headers.append('ACCESS-CONTROL-ALLOW-ORIGIN','*')
  return res
} 

export const config = {
  matcher: [
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/:path*`,
    `${process.env.NEXT_PUBLIC_API_BASE_URL}users/:path*`,
    `${process.env.NEXT_PUBLIC_API_BASE_URL}conversations/:path*`
  ]
};