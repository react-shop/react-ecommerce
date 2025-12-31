import type { Metadata } from 'next';
import { SdkProvider } from '@react-shop/sdk';
import '@react-shop/design-system/src/styles/global.css';

export const metadata: Metadata = {
  title: 'React Ecommerce - Shop the Best Products',
  description: 'Modern ecommerce store with the best products and deals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SdkProvider 
          apiConfig={{ 
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
          }}
        >
          {children}
        </SdkProvider>
      </body>
    </html>
  );
}

