import { Types } from "mongoose";



export interface IBorrow {
    book: Types.ObjectId; // Reference to the borrowed book's ID
    quantity: number;
    dueDate: Date; 
}

