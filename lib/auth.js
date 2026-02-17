import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dastiyor-admin-secret-change-in-production"
);

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "7d"; // 7 days

/**
 * Sign a JWT for an admin user. Payload: { sub: userId, role, email }.
 */
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(SECRET);
}

/**
 * Verify JWT and return payload or null.
 */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Get token from request: cookie (admin_token) or Authorization Bearer.
 */
export function getTokenFromRequest(request) {
  const cookie = request.cookies?.get(COOKIE_NAME)?.value;
  if (cookie) return cookie;
  const auth = request.headers?.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

export { COOKIE_NAME };
