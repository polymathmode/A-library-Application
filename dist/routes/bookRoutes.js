"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const auth_1 = require("../utility/auth");
const router = express_1.default.Router();
router.post('/createBook', auth_1.auth, booksController_1.createBook);
router.get('/getAllBooks', booksController_1.getAllBooks);
router.post('/updatebook', auth_1.auth, booksController_1.updateBooks);
router.delete('/deleteBook', auth_1.auth, booksController_1.deleteBook);
exports.default = router;
