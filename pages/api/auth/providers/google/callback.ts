import { query } from "services/db";
import { sign } from "utils/jwt";

import type { NextApiRequest, NextApiResponse } from "next";

const {
  GOOGLE_OAUTH2_TOKEN_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH2_REDIRECT_URI,
} = process.env;

const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

export const getGoogleToken = async (code: string) => {
  if (
    GOOGLE_CLIENT_ID === undefined ||
    GOOGLE_CLIENT_SECRET === undefined ||
    GOOGLE_OAUTH2_REDIRECT_URI === undefined ||
    GOOGLE_OAUTH2_TOKEN_URL === undefined
  ) {
    return {};
  }

  const qs = new URLSearchParams();

  qs.append("code", code);
  qs.append("client_id", GOOGLE_CLIENT_ID);
  qs.append("client_secret", GOOGLE_CLIENT_SECRET);
  qs.append("redirect_uri", GOOGLE_OAUTH2_REDIRECT_URI);
  qs.append("grant_type", "authorization_code");

  const response = await fetch(GOOGLE_OAUTH2_TOKEN_URL, {
    method: "POST",
    body: qs.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = (await response.json()) as {
    access_token: string;
    scope: string;
    token_type: string;
    expires_in: number;
  };

  return {
    access_token: data.access_token,
    scope: data.scope,
    token_type: data.token_type,
    expiry_date: new Date().getTime() + data.expires_in * 1000,
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (!request.query.code || request.query.code instanceof Array) {
    response.status(500).send("Must include code in request");
    return;
  }

  const { access_token } = await getGoogleToken(request.query.code);

  if (!access_token) {
    response.status(500).send("Could not get access_token from Google");
    return;
  }

  const result = await fetch(GOOGLE_USER_INFO_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "image/jpeg",
      Authorization: `Bearer ${access_token}`,
    },
  }).then((response) => response.json());

  let users = await query<
    { id: string }[]
  >`select id from users where email = ${result.email}`;

  if (users.length === 0) {
    users = await query`
      with u as (
        insert into users (email) values (${result.email}) returning id
      ), profile as (
        insert into profiles (id, name, avatar) select id, ${result.name}, ${result.picture} from u
      ), provider as (
        select id as provider_id from providers where name = 'google'
      ) insert into accounts (uid, provider_id, user_id) select ${result.sub}, provider_id, id from u, provider returning user_id as id;
    `;
  }

  const [user] = users;

  const jwt = await sign<{ user: User }>({
    user: {
      ...user,
      email: result.email,
      name: result.name,
      avatar: result.picture,
    },
  });

  const cookie = `alicent_auth=${jwt}; path=/; samesite=lax; httponly;`;

  response.setHeader("set-cookie", cookie).redirect("/email");
}
