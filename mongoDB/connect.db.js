import { connect } from "mongoose";
import "./config.js";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);   
    console.log("MongoDB connected successfully");
    } catch (error) {   
    console.error("MongoDB connection error:", error);
    process.exit(1);
  } 
};

export default connectDB;