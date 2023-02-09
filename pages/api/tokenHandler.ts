import getAuthToken from "./getAccessToken";
import { NextApiRequest, NextApiResponse } from "next";

let storedToken: any;
let timeoutId: any;

const tokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!storedToken) {
    storedToken = await getAuthToken(req);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      storedToken = null;
    }, 1000 * 60 * 60); // refresh every hours
  }

  console.log(storedToken, "tokenHandler");
  res.status(200).json({ token: storedToken });
};

export default tokenHandler;
