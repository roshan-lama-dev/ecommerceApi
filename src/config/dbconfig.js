import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    conn && console.log("Connection established to the database");
  } catch (error) {
    console.log("error from database connection", error);
  }
};
