import { NextApiRequest, NextApiResponse } from "next";
import stripe from "services/stripe";
import { verify } from "utils/jwt";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const jwt = request.cookies.alicent_auth;

  if (jwt) {
    const { user } = await verify<{ user: User }>(jwt);
    const proto = request.headers["x-forwarded-proto"] ? "https" : "http";
    const { redirect_to } = request.query;

    if (process.env.STRIPE_SUBSCRIPTION_PRO === undefined) {
      throw new Error("Must provide stripe subscription");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRO,
          quantity: 1,
        },
      ],
      client_reference_id: user.id,
      customer_email: user.email,
      mode: "subscription",
      success_url: `${proto}://${request.headers.host}${redirect_to}`,
      cancel_url: `${proto}://${request.headers.host}${redirect_to}`,
    });

    if (session.url) {
      response.status(303).redirect(303, session.url);
    }
  }
}
