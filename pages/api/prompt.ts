import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { prompt } = request.body;
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `5 versions of a ${prompt} in an single spaced enumerated list without any other text.`,
    temperature: 0.9,
    max_tokens: 1024,
  });

  console.log(prompt, completion.data);

  const [_, results] = completion.data.choices[0].text.split("\n\n");

  response.status(200).json(results.split("\n"));
}
