import cors from "cors"; // Import the cors package
import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controllers";
import { borrowRoutes } from "./app/controllers/borrow.controllers";

const app: Application = express();

app.use(express.json());
// Use cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-4-cz6ci4d2y-mdasraful56s-projects.vercel.app/",
      "https://b5-assignment-4-rho.vercel.app/",
    ],
  })
);

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

// MAIN ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management API");
});

// error handler 404 standard
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

export default app;
