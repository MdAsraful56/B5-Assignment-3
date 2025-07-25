
import express, { Request, Response }  from 'express';
import { Book } from '../modules/books.modules';
import { Borrow } from '../modules/borrow.modules';




export const borrowRoutes = express.Router();



// get all borrows
borrowRoutes.get("/", async (req: Request, res: Response) => {
    // const data = await Borrow.find().populate("book");

    const data = await Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        {
            $unwind: "$bookDetails"
        },
        {
            $project: {
                _id: 0,
                book: {
                    title: "$bookDetails.title",
                    isbn: "$bookDetails.isbn"
                },
                totalQuantity: 1
                }
        }
    ])

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
            existingBook.copies -= body.quantity;
            await existingBook.save();
            res.status(201).json({
                success: true,
                message: "Borrow created successfully",
                data
            });
        }
    });

// delete a borrow by id
borrowRoutes.delete("/:borrowId", async (req, res) => {
    const { borrowId } = req.params;
    const data = await Borrow.findByIdAndDelete(borrowId);

    res.status(200).json({
        success: true,
        message: "Borrow deleted successfully",
        data
    });
});





