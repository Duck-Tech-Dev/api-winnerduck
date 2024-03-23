import { CookieOptions } from "express";

export const jwtConstants = {
  secret: 'TODO: change me and secure me in a safe place',
  expiresIn: '6h'
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  priority: "high",
  maxAge: 21600000
};
