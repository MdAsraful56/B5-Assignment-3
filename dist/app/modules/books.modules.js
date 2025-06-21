"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"], trim: true },
    genre: {
        type: String,
        uppercase: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "write a valid genre from the list: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY"
        }
    },
    isbn: { type: String, unique: true, required: [true, "ISBN is required"], trim: true },
    description: { type: String },
    copies: { type: Number, required: [true, "Copies are required"], min: [0, "Copies must be a positive number"] },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.
