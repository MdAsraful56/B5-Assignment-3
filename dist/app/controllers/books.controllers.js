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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_modules_1 = require("../modules/books.modules");
exports.booksRoutes = express_1.default.Router();
// get all books
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit } = req.query;
    let data = {};
    if (filter || sortBy || sort || limit) {
        if (filter) {
            data = yield books_modules_1.Book.find({ genre: String(filter).toUpperCase().trim() });
        }
        else if (sort && sortBy) {
            data = yield books_modules_1.Book.find().sort({ [String(sortBy)]: sort === "desc" ? -1 : 1 });
        }
        else if (limit) {
            data = yield books_modules_1.Book.find().limit(Number(limit));
        }
        else {
            data = yield books_modules_1.Book.find({ genre: String(filter).toUpperCase().trim() })
                .sort({ [String(sortBy)]: sort === "desc" ? -1 : 1 })
                .limit(Number(limit));
        }
    }
    else {
        data = yield books_modules_1.Book.find();
    }
    res.status(200).json({
        success: true,
        message: "All books retrieved successfully",
        data
    });
}));
// create a new book
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield books_modules_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data
    });
}));
// get a book by id
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const data = yield books_modules_1.Book.findOne({ _id: bookId });
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
}));
// update a book by id
exports.booksRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const body = req.body;
    const data = yield books_modules_1.Book.findByIdAndUpdate(bookId, body, { new: true });
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data
    });
}));
// delete a book by id
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const data = yield books_modules_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data
    });
}));
// filter books by some properties 
// booksRoutes.get("/", async (req: Request, res: Response) => {
//     
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
