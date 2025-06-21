import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controllers";
import { borrowRoutes } from "./app/controllers/borrow.controllers";


const app: Application = express();

app.use(express.json());


app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);


// MAIN ROUTES
app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Library Management API');
});

// error handler 404 standard
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Resource not found"
    });
});

export default app;

