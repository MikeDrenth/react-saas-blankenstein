import { getAccessToken } from "./authRequest";
let storedToken: any;
let lastUsed: number;
let timeoutId: any;

const tokenHandler = async (site: string) => {
  if (!storedToken || Date.now() - lastUsed > 1000 * 60 * 60) {
    storedToken = await getAccessToken(site);
    lastUsed = Date.now();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (Date.now() - lastUsed > 1000 * 60 * 60) {
        storedToken = null;
      }
    }, 1000 * 60 * 60);
    console.log(storedToken.token, "Hier kom ik 1x per uur in");
    return storedToken;
  }
};

export default tokenHandler;
