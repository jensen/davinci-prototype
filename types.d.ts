interface BaseFormatter {
  content: string | null;
  tone: string | null;
  brand: string | null;
  custom: string | null;
}

interface EmailFormatter extends BaseFormatter {
  type: string | null;
}

interface WebsiteFormatter extends BaseFormatter {
  section: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: "base" | "pro";
}

declare module "stripe" {
  namespace Stripe {
    type DiscriminatedEvent =
      | DiscriminatedEvent.CheckoutSessionEvent
      | DiscriminatedEvent.CustomerSubscriptionEvent;
  }

  namespace DiscriminatedEvent {
    type Type = "checkout.session.completed" | "customer.subscription.updated";

    interface Data<T> {
      object: T;
      previous_attributes?: Partial<T>;
    }

    interface CheckoutSessionEvent extends Stripe.Event {
      type: "checkout.session.completed";
      data: DiscriminatedEvent.Data<Stripe.Checkout.Session>;
    }

    interface CustomerSubscriptionEvent extends Stripe.Event {
      type: "customer.subscription.updated";
      data: DiscriminatedEvent.Data<Stripe.Subscription>;
    }
  }
}
