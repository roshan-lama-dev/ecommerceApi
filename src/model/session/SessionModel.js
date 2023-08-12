import SessionSchema from "./SessionSchema.js";

export const createSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

// get single session::OTP
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

// delete session where token is OTP and associate is email

export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
