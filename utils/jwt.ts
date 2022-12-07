import { SignJWT, jwtVerify } from "jose";

const { JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
  throw new Error("Must provide a secret key to sign the jwt");
}

export async function sign(
  payload: Record<string, any>,
  secret?: string
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret || JWT_SECRET_KEY));
}

export async function verify(token: string, secret?: string) {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(secret || JWT_SECRET_KEY)
  );

  return payload;
}
