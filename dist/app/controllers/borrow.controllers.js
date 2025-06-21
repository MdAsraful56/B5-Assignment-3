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
const borrow_modules_1 = require("../modules/borrow.modules");
exports.borrowRoutes = express_1.default.Router();
// get all borrows
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrows = yield borrow_modules_1.Borrow.find();
    res.status(200).json({
        success: true,
        message: "All borrows retrieved successfully",
        borrows
    });
}));
// create a new borrow
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Logic to create a new borrow
    res.status(201).json({
        success: true,
        message: "Borrow created successfully",
        // data: {} // Replace with actual data
    });
}));
// get a borrow by id
exports.borrowRoutes.get("/:borrowId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.params;
    // Logic to retrieve a borrow by ID
    res.status(200).json({
        success: true,
        message: "Borrow retrieved successfully",
        // data: {} // Replace with actual data
    });
}));
