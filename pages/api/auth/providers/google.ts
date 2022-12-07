import type { NextApiRequest, NextApiResponse } from "next";

const {
  GOOGLE_OAUTH2_AUTH_BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_OAUTH2_REDIRECT_URI,
} = process.env;

export const generateGoogleAuthUrl = () => {
  if (
    GOOGLE_CLIENT_ID === undefined ||
    GOOGLE_OAUTH2_REDIRECT_URI === undefined
  ) {
    return null;
  }

  const qs = new URLSearchParams();

  qs.append("response_type", "code");
  qs.append("client_id", GOOGLE_CLIENT_ID);
  qs.append("redirect_uri", GOOGLE_OAUTH2_REDIRECT_URI);
  qs.append("scope", "openid profile email");

  return `${GOOGLE_OAUTH2_AUTH_BASE_URL}?${qs.toString()}`;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const url = generateGoogleAuthUrl();

  if (url === null) {
    response.status(500).send("Could not create provider url");
    return;
  }

  response.redirect(url);
}
