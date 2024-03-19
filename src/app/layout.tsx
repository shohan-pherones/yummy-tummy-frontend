import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Rubik } from "next/font/google";
import "./globals.css";
import MyAuth0Provider from "@/providers/MyAuth0Provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Yummy Tummy",
  description: "Food ordering web app.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MyAuth0Provider>
      <html lang="en" className="scroll-smooth">
        <body className={rubik.className}>
          <main className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
          </main>
          <Footer />
        </body>
      </html>
    </MyAuth0Provider>
  );
};

export default RootLayout;
