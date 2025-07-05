import { model, Schema } from "mongoose";
import { IBooks } from "../interface/books.interface";

const bookSchema = new Schema<IBooks>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    image: { type: String, required: [true, "Image is required"], trim: true },
    genre: {
      type: String,
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "write a valid genre from the list: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      unique: [true, "ISBN must be unique"],
      required: [true, "ISBN is required"],
      trim: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Copies are required"],
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

bookSchema.pre("save", function () {
  if (this.copies < 0) {
    throw new Error("Copies must be a positive number");
  }
});

bookSchema.pre("save", async function () {
  const existing = await Book.findOne({ copies: this.copies });
  if (this.copies === 0) {
    this.available = false;
  }
});

export const Book = model("Book", bookSchema);
