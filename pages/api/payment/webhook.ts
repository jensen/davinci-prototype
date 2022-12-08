import { constructEvent } from "services/stripe";
import { query } from "services/db";

import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const event = await constructEvent(request);

    console.log(event.type);

    if (event.type === "checkout.session.completed") {
      console.log(event);
      await query`update subscriptions set customer_id = ${event.data.object.customer} where user_id = ${event.data.object.client_reference_id}::uuid`;
    }

    if (event.type === "customer.subscription.updated") {
      if (event.data.object.status === "active") {
        console.log(event);
        await query`update subscriptions set plan = 'pro' where customer_id = ${event.data.object.customer}`;
      }
    }

    response.status(200).send("");
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method Not Allowed");
  }
}
