import { verify } from "utils/jwt";

export function withAuth() {
  return async (context) => {
    const cookie = context.req.headers.cookie;

    if (!cookie) {
      return {
        props: {
          user: null,
        },
      };
    }

    try {
      const { user } = await verify(cookie.split("=")[1]);

      return {
        props: {
          user,
        },
      };
    } catch (error) {
      return {
        props: {
          user: null,
        },
      };
    }
  };
}
