import { SITE } from '@/lib/site';
import './globals.css';

export const viewport = {
  themeColor: '#0B0C0C',
  width: 'device-width',
  initialScale: 1
};

export const metadata = {
  metadataBase: new URL('https://shobu.video'),
  title: `${SITE.brandName} — ${SITE.role}`,
  description: `${SITE.brandName} is a professional ${SITE.role}. I shape raw footage into stories people finish watching: commercials, high-retention shorts, and narrative documentaries.`,
  keywords: [
    'video editor',
    'colorist',
    'Color Grading',
    'Premiere Pro',
    'commercial video editor',
    'shorts editor',
    'retention editing',
    'Shobu video editor'
  ],
  authors: [{ name: SITE.brandName }],
  creator: SITE.brandName,
  openGraph: {
    title: `${SITE.brandName} — ${SITE.role}`,
    description: SITE.hero.tagline,
    url: 'https://shobu.video',
    siteName: SITE.brandName,
    images: [
      {
        url: '/work/solid-design.svg',
        width: 1200,
        height: 630,
        alt: `${SITE.brandName} Portfolio Showreel`
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.brandName} — ${SITE.role}`,
    description: SITE.hero.tagline,
    images: ['/work/solid-design.svg']
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: SITE.brandName,
        jobTitle: SITE.role,
        url: 'https://shobu.video',
        sameAs: [
          SITE.linktree,
          'https://instagram.com',
          'https://youtube.com'
        ]
      },
      {
        '@type': 'ProfessionalService',
        name: `${SITE.brandName} Video Editing`,
        image: 'https://shobu.video/portrait.png',
        url: 'https://shobu.video',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressCountry: 'IN'
        },
        priceRange: '$$'
      }
    ]
  };

  return (
    <html lang="en" data-tone="dark">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Literal font families for canvas & WebGL */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400;1,9..40,700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#home" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
