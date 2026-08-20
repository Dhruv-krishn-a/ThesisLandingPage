import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-libre",
});

import { getContentData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let title = "WRIrk - Premium Publication Support & Academic Services";
  let description = "Navigate the complex landscape of high-impact publishing. We empower scholars to achieve recognition in Scopus, Web of Science, and UGC-CARE indexed journals seamlessly.";
  
  try {
    const data = await getContentData();
    if (data?.globalSettings?.seoTitle?.value) {
      title = data.globalSettings.seoTitle.value;
    }
    if (data?.globalSettings?.seoDescription?.value) {
      description = data.globalSettings.seoDescription.value;
    }
  } catch(e) {}

  return {
    title,
    description,
    keywords: "Publication Support, Publication Assistance, Publish Research Paper, Research Paper Publication, Journal Publication Help",
    alternates: {
      canonical: "https://publication.wrirk.in/",
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "BYFn0MOlE9xYJjRXkmjrW9ooFx0MWn9jQ0FkbFDkRaY"
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MVL7QH95');
          `}
        </Script>

        {/* Google Analytics */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-61LLBY0BTP" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-61LLBY0BTP');
          `}
        </Script>

        {/* JSON-LD Schemas */}
        <Script id="faq-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can you help if my research paper is already completed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. If your manuscript is ready, our Publication Assistance service helps you identify suitable journals, assists with manuscript formatting according to journal requirements, supports journal communication, and guides you throughout the submission and publication process."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help me choose the right journal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Based on your research area, publication goals, and manuscript, our experts recommend suitable journals that best match your research objectives, indexing requirements, and publication preferences."
                }
              },
              {
                "@type": "Question",
                "name": "Do you communicate with journals during the publication process?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Our team assists researchers with journal communication, submission follow-ups, and publication-related correspondence to help ensure a smooth publication experience."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the publication process usually take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Publication timelines vary depending on the journal, research domain, and peer-review process. During your consultation, our experts will explain the expected timeline based on your publication requirements and the selected journal."
                }
              },
              {
                "@type": "Question",
                "name": "Do you guarantee publication?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The final publication decision always depends on the journal's editorial policies and peer-review process. Our role is to help researchers choose suitable journals, assist with publication requirements, and provide guidance throughout the publication journey."
                }
              },
              {
                "@type": "Question",
                "name": "How do I get started?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply fill out the consultation form or contact our team. One of our publication experts will understand your publication requirements, recommend the most suitable support, and guide you through the next steps."
                }
              }
            ]
          })
        }} />
        
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "WRIRK Publication Support",
            "url": "https://publication.wrirk.in/"
          })
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MVL7QH95"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        {children}
      </body>
    </html>
  );
}
