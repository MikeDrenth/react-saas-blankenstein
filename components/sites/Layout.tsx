import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Menu from "@/components/Menu";

import type { Meta, WithChildren } from "@/types";
import GridLayouts from "../GridLayouts";

interface LayoutProps extends WithChildren {
  meta?: Meta;
  siteId?: string;
  subdomain?: string;
}

export default function Layout({ meta, children, subdomain }: LayoutProps) {
  return (
    <div className="bg-orange-50 min-h-screen">
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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Vercel" />
        <meta name="twitter:creator" content="@StevenTey" />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        <meta name="twitter:image" content={meta?.ogImage} />
        {subdomain != "demo" && <meta name="robots" content="noindex" />}
      </Head>
      <nav className="bg-white fixed w-full top-0 left-0 shadow-sm">
        <div className="container flex justify-center items-center mx-auto">
          <Menu pages={meta?.pages}></Menu>
        </div>
      </nav>
      <div className="pt-20 container mx-auto">
        <h1 className="mt-8 text-2xl text-left">{meta?.title}</h1>
        {meta?.layouts && <GridLayouts layouts={meta.layouts} />}
      </div>
    </div>
  );
}
