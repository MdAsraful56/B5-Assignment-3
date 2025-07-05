import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
// const cors = require("cors"); // Import the cors package

dotenv.config();

let server: Server;
const port = process.env.PORT || 5000;

const URL = process.env.MONGODB_URI as string;

async function main() {
  try {
    // Your code here
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
    server = app.listen(port, () => {
      console.log(`Server is running on port : http://localhost:${port}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
