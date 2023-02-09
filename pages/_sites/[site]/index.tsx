import Layout from "@/components/sites/Layout";
import { useRouter } from "next/router";
import { NextApiRequest } from "next";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { _SiteData, Meta } from "@/types";
import { getSiteInfo, getPages } from "@/lib/getWebsiteInfo";

interface IndexProps {
  stringifiedData: string;
  stringifiedPages: string;
}

export default function Index({
  stringifiedData,
  stringifiedPages,
}: IndexProps) {
  const router = useRouter();
  if (router.isFallback) return <div>Loader</div>;
  if (!stringifiedData) return;

  const data = JSON.parse(stringifiedData);
  const pages = JSON.parse(stringifiedPages);
  const info = data[0];

  const meta = {
    title: info.site_name,
    description: `Welkom bij ${info.description}`,
    logo: "/logo.png",
    ogImage: "logotje",
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: info.site_name,
    pages: pages,
  } as Meta;

  return <Layout meta={meta}></Layout>;
}

import { allWebsiteData } from "@/lib/allWebsiteData";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = allWebsiteData();

  return {
    paths: data,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  if (!context) throw new Error("No path parameters found");
  const site = context?.params?.site;
  const env = process.env.NODE_ENV;

  let res;
  let response: Record<string, string> = {};

  if (env === "production") {
    console.log(context);
    // res = await fetch("http://localhost:3000/api/tokenHandler");
    // response = await res.json();
  } else {
    res = await fetch("http://localhost:3000/api/tokenHandler");
    response = await res.json();
  }

  const token = response.token;
  const data = await getSiteInfo(site as string, token);
  const pages = await getPages(site as string, token);

  return {
    props: {
      stringifiedData: JSON.stringify(data),
      stringifiedPages: JSON.stringify(pages),
    },
  };
};
