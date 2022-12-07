import { NextApiRequest, NextApiResponse } from "next";
import { query } from "services/db";
import { verify } from "utils/jwt";

const MODEL = "text-davinci-003";
const TEMPERATURE = 0.9;
const MAX_TOKENS = 1024;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const jwt = request.cookies.alicent_auth;

  if (jwt) {
    const { user } = await verify<{ user: User }>(jwt);

    if (user) {
      const { prompt, type } = request.body;
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: MODEL,
        prompt: `5 versions of a ${prompt} in an single spaced enumerated list without any other text.`,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      });

      console.log(user, prompt, completion.data);

      const [_, results] = completion.data.choices[0].text.split("\n\n");

      try {
        await query`
        insert into completions (
          model,
          type,
          prompt,
          text,
          parsed,
          finished,
          usage_prompt,
          usage_completion,
          usage_total,
          user_id
        ) values (
          ${MODEL},
          ${type},
          ${prompt},
          ${completion.data.choices[0].text},
          ${JSON.stringify(results.split("\n"))}::json,
          ${completion.data.choices[0].finish_reason},
          ${completion.data.usage.prompt_tokens},
          ${completion.data.usage.completion_tokens},
          ${completion.data.usage.total_tokens},
          ${user.id}::uuid
        )`;
      } catch (error) {
        console.error(error);
      }

      response.status(200).json(results.split("\n"));
    }
  }
}
