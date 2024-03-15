import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yummy Tummy",
  description: "Food ordering web app.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="container mx-auto flex-1 py-10">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
