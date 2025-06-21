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
bookSchema.pre("save", function () {
    if (this.copies < 0) {
        throw new Error("Copies must be a positive number");
    }
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
