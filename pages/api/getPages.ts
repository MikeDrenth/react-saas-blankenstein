import { allWebsiteData } from "@/lib/allWebsiteData";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const data = allWebsiteData();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=43200"
  );

  return res.status(200).json("hallo");
};

export default handler;
