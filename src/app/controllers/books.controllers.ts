import express, { Request, Response }  from 'express';
import { Book } from '../modules/books.modules';




export const booksRoutes = express.Router();




// get all books
booksRoutes.get("/", async (req: Request, res: Response) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: "All books retrieved successfully",
        books
    });
});



// create a new book
booksRoutes.post("/", async (req: Request, res: Response) => {
    
    const body = req.body;
    const data = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data
    });
});



// get a book by id
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const data = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
});



// update a book by id
booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const body = req.body;
    const data = await Book.findByIdAndUpdate(bookId, body, { new: true });

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data
    });
});



// delete a book by id
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const data = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data
    });
});


// /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5


// filter books by some properties 
// booksRoutes.get("/", async (req: Request, res: Response) => {
//     const { filter, sortBy, sort, limit } = req.query;

//     const query: any = {};

//     if (filter) {
//         query.genre = filter;
//     }

//     const options: any = {
//         sort: { [String(sortBy || 'createdAt')]: sort === 'desc' ? -1 : 1 },
//         limit: parseInt(limit as string) || 10
//     };

//     const data = await Book.find(query, null, options);

//     res.status(200).json({
//         success: true,
//         message: "Books retrieved successfully",
//         data
//     });
// });