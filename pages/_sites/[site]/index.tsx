import Layout from "@/components/sites/Layout";
import { useRouter } from "next/router";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { _SiteData, Meta } from "@/types";
import { getPages } from "@/lib/getWebsiteInfo";

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
    },
  };
};
