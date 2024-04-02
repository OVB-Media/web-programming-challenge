import type { Metadata } from "next";
import "./global.css";
import { Rubik } from "next/font/google";
import { Providers } from "./providers";
import Image from "next/image";
import ollamaImg from "../../public/img/ollama.png"

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Local LLM UI",
  description: "Based on OVB programming challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <html lang="en" className="dark">
      <body className={rubik.className}>
        <Image src={ollamaImg} alt="Logo" className="invert float-left ml-16 mt-60"></Image>
        <Image src={ollamaImg} alt="Logo" className="invert float-right mr-16 mt-60"></Image>
        <div className="xl:w-1/3 md:w-1/2 mx-auto px-5 mt-4">
          <h1>Ask Ollama anything you want!</h1>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
