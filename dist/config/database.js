"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const connection = mongoose_1.default.connect(`mongodb+srv://ogbedigbo:0pxPKuU83zYizLCx@cluster0.w7mmlcd.mongodb.net/books`);
        console.log(`MongoDB Connected Successfully`);
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectDatabase = connectDatabase;
