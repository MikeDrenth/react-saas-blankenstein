import Head from "next/head";
import Menu from "@/components/Menu";

// Import types
import type { Meta } from "@/types";
import GridLayouts from "../GridLayouts";

interface LayoutProps {
  meta?: Meta;
  pages: [];
  stylesheet: [];
  layouts: [];
}

export default function Layout({
  meta,
  pages,
  layouts,
  stylesheet,
}: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{meta?.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href={meta?.logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={meta?.logo} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta itemProp="name" content={meta?.title} />
        <meta itemProp="description" content={meta?.description} />
        <meta itemProp="image" content={meta?.ogImage} />
        <meta name="description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:url" content={meta?.ogUrl} />
        <meta property="og:image" content={meta?.ogImage} />
        <meta property="og:type" content="website" />
      </Head>
      <nav className="bg-white fixed w-full top-0 left-0 shadow-sm">
        <div className="container flex justify-center items-center mx-auto">
          {pages && <Menu pages={pages}></Menu>}
        </div>
      </nav>
      <div className="pt-20 container mx-auto">
        <h1 className="mt-8 text-2xl text-left">
          {meta && meta.title && meta?.title}
        </h1>

        {meta && layouts && (
          <GridLayouts stylesheet={stylesheet} layouts={layouts} />
        )}
      </div>
    </div>
  );
}
