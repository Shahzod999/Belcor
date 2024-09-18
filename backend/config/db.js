import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected!");
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
