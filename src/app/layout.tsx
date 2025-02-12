import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Poppins } from "next/font/google";

import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({ subsets: ["latin"], weight: "400" }); // You can choose other weights like 300, 600, etc.

export const metadata = {
  title: "Swasembada",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
