import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/sites/Layout";

import type { Meta } from "@/types";

interface PathProps {
  site: string;
  slug: string;
}

interface PagesProps {
  page_url: string;
}

interface PostProps {
  stringifiedData: string;
  stringifiedPages: string;
  stringifiedSiteInfo: string;
  stringifiedLayouts: string;
}

export default function Post({
  stringifiedPages,
  stringifiedData,
  stringifiedSiteInfo,
  stringifiedLayouts,
}: PostProps) {
  const router = useRouter();
  if (router.isFallback) return <div>Loader...</div>;

  if (!stringifiedData || !stringifiedPages) return;

  const info = JSON.parse(stringifiedData);
  const pages = JSON.parse(stringifiedPages);
  const siteInfo = JSON.parse(stringifiedSiteInfo);

  const layouts = JSON.parse(stringifiedLayouts);
  const data = info[0];
  const site = siteInfo[0];

  const meta = {
    title: `${site?.site_name} | ${data?.page_title}`,
    description: `Welkom bij ${site?.site_description}`,
    logo: "/logo.png",
    ogImage: "logotje",
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: data?.site_name,
    pageTitle: data?.page_title,
    layouts: layouts && layouts,
    pages: pages && pages,
  } as Meta;
  return <Layout meta={meta}></Layout>;
}
import { allWebsiteData } from "@/lib/allWebsiteData";
import {
  getPages,
  getPageInfo,
  getSiteInfo,
  getLayoutRows,
} from "@/lib/getWebsiteInfo";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = allWebsiteData();

  const generatePaths = async () => {
    const paramsList: { params: { site: string; slug: string } }[] = [];

    await Promise.all(
      data.map(async ({ params }) => {
        const pages = await getPages(params.site);
        for (const page of pages) {
          paramsList.push({
            params: { site: params.site, slug: page.page_url },
          });
        }
      })
    );

    return paramsList;
  };

  const paths = await generatePaths();

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site, slug } = params;

  const pages = await getPages(site as string);
  const pageInfo = await getPageInfo(site as string, slug as string);
  const siteInfo = await getSiteInfo(site as string);
  const layouts = await getLayoutRows(site as string, slug as string);

  return {
    props: {
      stringifiedData: JSON.stringify(pageInfo),
      stringifiedPages: JSON.stringify(pages),
      stringifiedSiteInfo: JSON.stringify(siteInfo),
      stringifiedLayouts: JSON.stringify(layouts),
    },
  };
};
