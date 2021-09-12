import cookie, { CookieAttributes } from "js-cookie";

const COOKIE_OPTIONS: CookieAttributes = {
  sameSite: "strict",
  secure: true,
  expires: 7,
};

export const getTokenCookie = (): string | null => {
  return cookie.get("token") || null;
};

export const setTokenCookie = (value: string): void => {
  cookie.set("token", value, COOKIE_OPTIONS);
};

export const removeTokenCookie = (): void => {
  cookie.remove("token", COOKIE_OPTIONS);
};
