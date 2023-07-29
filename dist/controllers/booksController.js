"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBooks = exports.getAllBooks = exports.getAllUsers = exports.createBook = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const uuid_1 = require("uuid");
const createBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const findBook = await bookModel_1.default.findOne({ title });
        if (findBook) {
            return res.status(401).json({
                message: `Book already exists!`
            });
        }
        if (!findBook) {
            const newBook = await bookModel_1.default.create({
                title,
                author,
                datePublished: new Date(),
                description: '',
                pageCount: Number,
                genre,
                bookId: (0, uuid_1.v4)(),
                publisher: "publisher"
            });
            res.status(200).json({
                message: `Book Created Successfully`,
                newBook
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Mistake`
        });
    }
};
exports.createBook = createBook;
const getAllUsers = async (req, res) => {
    try {
        const books = await bookModel_1.default.find({});
        if (!books) {
            return res.status(404).json({
                message: `Book not available`
            });
        }
        if (books) {
            return res.status(200).json({
                message: `Here's a list of available books`,
                books
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.getAllUsers = getAllUsers;
const getAllBooks = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = Number(req.query.perPage) || 5; // Default to 10 items per page if not provided
        const totalBooks = await bookModel_1.default.countDocuments({});
        const totalPages = Math.ceil(totalBooks / perPage);
        const books = await bookModel_1.default.find({})
            .skip((page - 1) * perPage)
            .limit(perPage);
        if (!books || books.length === 0) {
            return res.status(404).json({
                message: `No books available`,
            });
        }
        return res.status(200).json({
            message: `Here's a list of available books (Page ${page}/${totalPages})`,
            books,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
exports.getAllBooks = getAllBooks;
const updateBooks = async (req, res) => {
    try {
        const { title, author, genre, bookId } = req.body;
        const updateBook = await bookModel_1.default.find({ title });
        if (!updateBook) {
            return res.status(404).json({
                message: `Book not available`
            });
        }
        if (updateBook) {
            const finalUpdate = await bookModel_1.default.findOneAndUpdate({ title });
            if (finalUpdate) {
                return res.status(200).json({
                    message: `Book Updated Successfully`,
                    finalUpdate
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.updateBooks = updateBooks;
const deleteBook = async (req, res) => {
    try {
        const { title, genre } = req.body;
        const deleteBook = await bookModel_1.default.find({ title });
        if (!deleteBook) {
            return res.status(404).json({
                message: `Book unavailable`
            });
        }
        if (deleteBook) {
            const deleteOne = await bookModel_1.default.deleteOne({ title });
            if (deleteOne) {
                return res.status(200).json({
                    message: `Book Deleted Successsfully`,
                    deleteBook
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.deleteBook = deleteBook;
