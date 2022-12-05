import { NextApiRequest, NextApiResponse } from "next";
import { query } from "services/db";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const users = await query`select * from users`;

  response.status(200).json(users);
}
