import Stripe from "stripe";

import type { NextApiRequest } from "next";
import type { Readable } from "stream";

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error("Must provide stripe key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default stripe;

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export const constructEvent = async (request: NextApiRequest) => {
  if (process.env.STRIPE_WEBHOOK_SECRET_KEY === undefined) {
    throw new Error("Must provide stripe webhook key");
  }

  const buf = await buffer(request);

  try {
    return stripe.webhooks.constructEvent(
      buf.toString("utf8"),
      request.headers["stripe-signature"] || "",
      process.env.STRIPE_WEBHOOK_SECRET_KEY
    ) as Stripe.DiscriminatedEvent;
  } catch (error) {
    console.log(error);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(`⚠️  Check the env file and enter the correct webhook secret.`);

    throw error;
  }
};
