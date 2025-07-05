"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors")); // Import the cors package
const express_1 = __importDefault(require("express"));
const books_controllers_1 = require("./app/controllers/books.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use cors middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Allow your frontend origin
}));
app.use("/api/books", books_controllers_1.booksRoutes);
app.use("/api/borrow", borrow_controllers_1.borrowRoutes);
// MAIN ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Library Management API");
});
// error handler 404 standard
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
    });
});
exports.default = app;
