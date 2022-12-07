import type { NextApiRequest, NextApiResponse } from "next";

type ResponseBody = { message: string };

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseBody>
) {
  response.status(401).json({ message: "Not authenticated" });
}
