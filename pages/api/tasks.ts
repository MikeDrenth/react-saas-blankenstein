import { getLayouts } from "../../lib/getWebsiteInfo";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const response = await getLayouts("blankensteinaanzee", 222, 63823);
  const layouts = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=43200"
  );

  return res.status(200).json("hallo");
};

export default handler;
