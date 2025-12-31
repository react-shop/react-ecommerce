import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SdkProvider } from "@react-shop/sdk";
import "@react-shop/design-system/src/styles/global.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "React Ecommerce - Shop the Best Products",
  description: "Modern ecommerce store with the best products and deals",
};

const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <SdkProvider apiConfig={apiConfig}>{children}</SdkProvider>
      </body>
    </html>
  );
}
