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
  title: "React Shop - Best Online Shopping Experience",
  description:
    "Shop the latest products at unbeatable prices. Free shipping, easy returns, and 24/7 customer support.",
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
