import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controllers";


const app: Application = express();

app.use(express.json());


app.use("/api/books", booksRoutes);
// app.use("/users", usersRoutes);



// MAIN ROUTES
app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Library Management API');
});




export default app;