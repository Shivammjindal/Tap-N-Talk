import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import StoreProvider from "./StoreProvider";
import ActiveStatus from "./users/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tap N Talk",
  description: "Messanger Clone",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode,
}>) {

  return (
    <html lang="en">
      {/* <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script> */}
        {/* if we do not make context than we got a hydration error means div can not be a child of html that's why always make context of such things */}
        {/* <Toaster position="top-center"/> */}
        <body className={inter.className}>
          
            <AuthContext>
              <StoreProvider>
                <ToasterContext/>
                <ActiveStatus/>
                  {children}
              </StoreProvider>
            </AuthContext>
          
        </body>
    </html>
  );
}
