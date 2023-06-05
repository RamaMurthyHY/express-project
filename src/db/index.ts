import mongoose from "mongoose";

const connectDb = () => {
  try {
    mongoose.connect(
      `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    );
    console.log("Connected database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDb };
