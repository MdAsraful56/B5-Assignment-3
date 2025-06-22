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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_modules_1 = require("../modules/books.modules");
const borrow_modules_1 = require("../modules/borrow.modules");
exports.borrowRoutes = express_1.default.Router();
// get all borrows
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const data = await Borrow.find().populate("book");
    const data = yield borrow_modules_1.Borrow.aggregate([
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
    ]);
    res.status(200).json({
        success: true,
        message: "All borrows retrieved successfully",
        data
    });
}));
// create a new borrow
exports.borrowRoutes.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const existingBook = yield books_modules_1.Book.findById(body.book);
        if (!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        else if (existingBook.copies < body.quantity) {
            return res.status(400).json({
                success: false,
                message: "No copies available"
            });
        }
        else {
            const data = yield borrow_modules_1.Borrow.create(body);
            existingBook.copies -= body.quantity;
            yield existingBook.save();
            res.status(201).json({
                success: true,
                message: "Borrow created successfully",
                data
            });
        }
    });
});
// delete a borrow by id
exports.borrowRoutes.delete("/:borrowId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.params;
    const data = yield borrow_modules_1.Borrow.findByIdAndDelete(borrowId);
    res.status(200).json({
        success: true,
        message: "Borrow deleted successfully",
        data
    });
}));
