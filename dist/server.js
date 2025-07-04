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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const cors = require("cors"); // Import the cors package
dotenv_1.default.config();
// Use cors middleware
app_1.default.use(cors({
    origin: "http://localhost:5173", // Allow your frontend origin
}));
let server;
const port = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Your code here
            yield mongoose_1.default.connect(URL);
            console.log("Connected to MongoDB");
            server = app_1.default.listen(port, () => {
                console.log(`Server is running on port : http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
main();
