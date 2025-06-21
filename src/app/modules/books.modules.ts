import { model, Schema } from "mongoose";
import { IBooks } from "../interface/books.interface";




const bookSchema = new Schema<IBooks>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true },
        genre: {
            type: String,
            uppercase: true,
            enum: {
                values: [ "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY" ],
                message: "write a valid genre from the list: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY"
            }
        },
        isbn: { type: String, unique: true, required: true, trim: true },
        description: { type: String },
        copies: { type: Number, required: true, min: 0 },
        available: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)



export const Book = model("Book", bookSchema);


// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.