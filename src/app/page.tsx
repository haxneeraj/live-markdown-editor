import Image from "next/image";
import MarkdownEditor from "./components/MarkdownEditor";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata = {
  title: "Live Markdown Editor",
  description: "A real-time markdown editor with GitHub-style preview.",
  keywords: ["Markdown", "Editor", "Live Preview", "GitHub"],
  openGraph: {
    title: "Live Markdown Editor",
    description: "A real-time markdown editor with GitHub-style preview.",
    url: "",
    siteName: "Live Markdown Editor",
    images: [
      {
        url: "/preview.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Markdown Editor",
    description: "A real-time markdown editor with GitHub-style preview.",
    images: ["/preview.png"],
  },
};

export default function Home() {
  return (
    <>
    <Header/>
    <MarkdownEditor/>
    <Footer/>
    </>
  );
}
