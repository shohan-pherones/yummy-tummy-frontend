import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Yummy Tummy",
  description: "Food ordering web app.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <main className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
