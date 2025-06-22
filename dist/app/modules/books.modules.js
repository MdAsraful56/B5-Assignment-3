"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    isbn: { type: String, unique: [true, "ISBN must be unique"], required: [true, "ISBN is required"], trim: true },
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
bookSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield exports.Book.findOne({ copies: this.copies });
        if (this.copies === 0) {
            this.available = false;
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
