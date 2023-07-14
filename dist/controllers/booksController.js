"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBooks = exports.getAllUsers = exports.createBook = void 0;
const bookModel_1 = require("../models/bookModel");
const uuid_1 = require("uuid");
const createBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const findBook = await bookModel_1.Book.findOne({ title });
        if (findBook) {
            return res.status(401).json({
                message: `Book already exists!`
            });
        }
        if (!findBook) {
            const newBook = await bookModel_1.Book.create({
                title,
                author,
                datePublished: new Date(),
                description: "description",
                pageCount: "pageCount",
                genre,
                bookId: (0, uuid_1.v4)(),
                publisher: "publisher"
            });
            const mainBook = await bookModel_1.Book.findOne({ title });
            if (mainBook) {
                res.status(200).json({
                    message: `Book Created Successfully`,
                    mainBook
                });
            }
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
        const books = await bookModel_1.Book.find({});
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
const updateBooks = async (req, res) => {
    try {
        const { title, author, genre, bookId } = req.body;
        const updateBook = await bookModel_1.Book.find({ title });
        if (!updateBook) {
            return res.status(404).json({
                message: `Book not available`
            });
        }
        if (updateBook) {
            const finalUpdate = await bookModel_1.Book.findOneAndUpdate({ title });
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
        const deleteBook = await bookModel_1.Book.find({ title });
        if (!deleteBook) {
            return res.status(404).json({
                message: `Book unavailable`
            });
        }
        if (deleteBook) {
            const deleteOne = await bookModel_1.Book.deleteOne({ title });
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
