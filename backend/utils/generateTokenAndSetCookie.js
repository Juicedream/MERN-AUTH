import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  }); //it will generate a auth token and cookie session which will expire in 7 days time
  res.cookie("token", token, {
    httpOnly: true, //this prevents XSS attacks where cookies will not be accessed from the client side
    secure: process.env.NODE_ENV === "production", //it can be on https when going on production
    sameSite: "strict", // to prevent csrf attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // the cookie wll expire in 7 days as the first value here (everything is in milliseconds)
  });

  return token;
};
