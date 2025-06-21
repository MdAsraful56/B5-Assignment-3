import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";



let server: Server;
const port = process.env.PORT || 5000;


async function main() {
    try {
        // Your code here
        await mongoose.connect("mongodb+srv://LibraryManager:LibraryManager@cluster0.hvhc0.mongodb.net/LibraryManagementAPI?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
        server = app.listen(port, () => {
            console.log(`Server is running on port : http://localhost:${port}`);
        })
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
