import type { GetServerSideProps } from "next";
import { verify } from "utils/jwt";
import { query } from "services/db";

export function withAuth() {
  return (async (context) => {
    const cookie = context.req.headers.cookie;

    if (!cookie) {
      return {
        props: {
          user: null,
        },
      };
    }

    try {
      const { user } = await verify<{ user: User }>(cookie.split("=")[1]);

      const [details] = await query<
        { plan: string }[]
      >`select subscriptions.plan from subscriptions join users on users.id = subscriptions.user_id where users.id = ${user.id}::uuid`;

      return {
        props: {
          user: {
            ...user,
            ...details,
          },
        },
      };
    } catch (error) {
      return {
        props: {
          user: null,
        },
      };
    }
  }) as GetServerSideProps<{ user: User | null }>;
}
