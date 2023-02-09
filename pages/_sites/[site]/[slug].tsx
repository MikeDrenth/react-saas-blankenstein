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
}

export default function Post({ stringifiedPages, stringifiedData }: PostProps) {
  const router = useRouter();
  if (router.isFallback) return <div>Loader...</div>;

  if (!stringifiedData || !stringifiedPages) return;

  const info = JSON.parse(stringifiedData);
  const pages = JSON.parse(stringifiedPages);
  const data = info[0];

  const meta = {
    title: data?.site_name,
    description: `Welkom bij ${data?.description}`,
    logo: "/logo.png",
    ogImage: "logotje",
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: data?.site_name,
    pageTitle: data?.page_title,
    layoutRows: data?.layoutRows,
    pages: pages,
  } as Meta;

  return <Layout meta={meta}></Layout>;
}

import { allWebsiteData } from "@/lib/allWebsiteData";
import { getPages, getPageInfo } from "@/lib/getWebsiteInfo";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = allWebsiteData();
  const env = process.env.NODE_ENV;

  // Hieronder worden alle pagina's ophaald van website's binenn het project
  // Deze zijn nodig voor bij de build, dit zorgt voor een sneller load
  // Kijken hoe dit gaat met caching en of dit eventueel voor problemen kan zorgen bij de build van de website
  const pages = async () => {
    const allPages = data.map(async ({ params }) => {
      const site = params.site;
      let res;
      let response: Record<string, string> = {};

      if (env === "production") {
        res = await fetch(
          "https://nextjs-saas-delta.vercel.app/api/tokenHandler"
        );
        response = await res.json();
      } else {
        res = await fetch("http://localhost:3000/api/tokenHandler");
        response = await res.json();
      }

      const token = response.token;
      if (!site) return;
      const pages = await getPages(site, token);
      if (!pages) return;
      return pages?.map((page: PagesProps) => ({
        params: { site: site, slug: page.page_url },
      }));
    });

    return await Promise.all(allPages);
  };

  const paths = await pages();

  return {
    paths: paths[0],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site, slug } = params;
  const env = process.env.NODE_ENV;

  // Site info ophalen, deze is nodig voor de site id adhv de website
  // Deze is nodig voor het ophalen van de layouts of andere pagina informatie
  let res;
  let response: Record<string, string> = {};

  if (env === "production") {
    res = await fetch("https://nextjs-saas-delta.vercel.app/api/tokenHandler");
    response = await res.json();
  } else {
    res = await fetch("http://localhost:3000/api/tokenHandler");
    response = await res.json();
  }
  const token = response.token;
  const pages = await getPages(site as string, token);
  const pageInfo = await getPageInfo(site as string, slug as string);

  return {
    props: {
      stringifiedData: JSON.stringify(pageInfo),
      stringifiedPages: JSON.stringify(pages),
    },
  };
};
