import Jwt from "jsonwebtoken";
import { createSession } from "../model/session/SessionModel.js";
import { findAdminAndUpdate } from "../model/adminUser/AdminUserModel.js";

// create a token

export const signAccessJWT = async (payload) => {
  const token = Jwt.sign(payload, process.env.ACCESS_JWT, { expiresIn: "60m" });

  //   store the token in the session

  await createSession({ token });

  return token;
};

// verify token
export const verifyAccessJWT = (token) => {
  try {
    return Jwt.verify(token, process.env.ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};

// verify refresh token

export const verifyRefreshJWT = (token) => {
  try {
    return Jwt.verify(token, process.env.ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};

// signRefreshToken

export const signRefreshJWT = async (payload) => {
  const token = Jwt.sign(payload, process.env.REFRESH_JWT, {
    expiresIn: "30d",
  });
  await findAdminAndUpdate(payload, { refreshJWT: token });
};
