import { Caveat_Brush } from 'next/font/google'
const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-caveat-brush',
})
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"; 
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "truethoughts",
  description: "Your own journal app.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={caveatBrush.variable}
        >
          <div className="bg-[url('/bg.png')] bg-no-repeat bg-cover fixed inset-0 -z-50" />
          <Header />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
