"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
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
                    message: `Book Created Successfully`
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
