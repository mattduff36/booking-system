import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import QueryProvider from '@/components/providers/QueryProvider';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';
import { LocalBusinessStructuredData } from '@/components/seo/StructuredData';
import { getBusinessConfig } from '@/lib/config/business-config';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Generate dynamic metadata using business configuration
export async function generateMetadata(): Promise<Metadata> {
  const config = getBusinessConfig();
  
  return {
    metadataBase: new URL(config.business.website || 'https://yourbusiness.com'),
    title: {
      default: config.seo.metaTitle,
      template: `%s | ${config.business.shortName}`
    },
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    authors: [{ name: config.business.name }],
    creator: config.business.name,
    publisher: config.business.name,
    category: "Professional Services",
    classification: "Local Business - Service Provider",
    openGraph: {
      title: config.seo.metaTitle,
      description: config.seo.metaDescription,
      url: config.business.website,
      siteName: config.business.name,
      images: [
        {
          url: config.seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${config.business.name} - Professional Service Provider`,
        },
        {
          url: config.branding.logoPath,
          width: 512,
          height: 512,
          alt: `${config.business.name} Logo`,
        },
      ],
      locale: "en_US",
      type: "website",
      countryName: "United States",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.metaTitle,
      description: config.seo.metaDescription,
      images: [config.seo.ogImage],
      creator: `@${config.business.shortName.toLowerCase().replace(/\s+/g, '')}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // verification: {
    //   google: "your-google-verification-code", // Will be added after Google Search Console setup
    //   // yandex: "your-yandex-verification-code",
    //   // bing: "your-bing-verification-code",
    // },
    icons: {
      icon: [
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'icon', url: '/favicon/favicon.ico' },
      ],
    },
    manifest: '/favicon/site.webmanifest',
  };
}

// Metadata is now generated dynamically via generateMetadata function

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TKVJT9MKYB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TKVJT9MKYB');
          `}
        </Script>

        <QueryProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </QueryProvider>
        <Toaster />
        <Analytics />
        <LocalBusinessStructuredData />
      </body>
    </html>
  );
}
