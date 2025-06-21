
import express, { Request, Response }  from 'express';
import { Book } from '../modules/books.modules';
import { Borrow } from '../modules/borrow.modules';




export const borrowRoutes = express.Router();



// get all borrows
borrowRoutes.get("/", async (req: Request, res: Response) => {
    const data = await Borrow.find().populate("book");
    res.status(200).json({
        success: true,
        message: "All borrows retrieved successfully",
        data
    });
});


// create a new borrow
borrowRoutes.post("/", async function (req: Request, res: Response): Promise<any> {
    const body = req.body;

        const existingBook = await Book.findById(body.book);
        if (!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        } else if (existingBook.copies < body.quantity) {
            return res.status(400).json({
                success: false,
                message: "No copies available"
            });
        } else {
            const data = await Borrow.create(body);
            res.status(201).json({
                success: true,
                message: "Borrow created successfully",
                data
            });
        }
    });


// get a borrow by id
borrowRoutes.get("/:borrowId", async (req, res) => {
    const { borrowId } = req.params;
    // Logic to retrieve a borrow by ID
    res.status(200).json({
        success: true,
        message: "Borrow retrieved successfully",
        // data: {} // Replace with actual data
    });
});