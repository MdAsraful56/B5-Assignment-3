import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";



const borrowSchema = new Schema<IBorrow>(
    {
        book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true, min: 1 },
        dueDate: { type: Date, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


borrowSchema.pre("save", function () {
    if (!this.dueDate || this.dueDate < new Date()) {
        throw new Error("Due date must be a valid future date");
    }
});





export const Borrow = model("Borrow", borrowSchema);