import type { Metadata } from "next";
import "./globals.css";
import "./fonts/montserrat.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import AuthProviderWrapper from "@/app/providers/AuthProvider";

export const metadata: Metadata = {
  title: "International Safety Training Centre | Professional Safety Training & Certification",
  description: "ISTC offers comprehensive safety training, certification, and consultancy services...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-white to-accent-50/30">
        <AuthProviderWrapper>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          
          {/* 2. Add the Widget here */}
          <WhatsAppWidget />

        </AuthProviderWrapper>
      </body>
    </html>
  );
}
