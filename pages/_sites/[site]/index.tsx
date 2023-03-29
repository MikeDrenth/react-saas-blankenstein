import Layout from "@/components/sites/Layout";
import { useRouter } from "next/router";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { _SiteData, Meta } from "@/types";
import { getSiteInfo, getPages } from "@/lib/getWebsiteInfo";

interface IndexProps {
  stringifiedData: string;
  stringifiedPages: string;
  stringifiedSite: string;
}

export default function Index({
  stringifiedData,
  stringifiedPages,
  stringifiedSite,
}: IndexProps) {
  const router = useRouter();
  if (router.isFallback) return <div>Loader</div>;
  if (!stringifiedData) return;

  const data = JSON.parse(stringifiedData);
  const pages = JSON.parse(stringifiedPages);
  const site = JSON.parse(stringifiedSite);
  const info = data[0];

  const meta = {
    title: info && info.site_name && info.site_name,
    description: `Welkom bij ${site}`,
    logo: "/logo.png",
    ogImage: "logotje",
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: info && info.site_name && info.site_name,
    pages: pages && pages,
    site,
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

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  params,
}) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;

  const data = await getSiteInfo(site as string);
  const pages = await getPages(site as string);
  return {
    props: {
      stringifiedData: JSON.stringify(data),
      stringifiedPages: JSON.stringify(pages),
      stringifiedSite: JSON.stringify(site),
    },
  };
};
