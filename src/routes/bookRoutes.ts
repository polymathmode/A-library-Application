import express from "express";
import { createBook, deleteBook, getAllBooks, updateBooks } from "../controllers/booksController";
import { auth } from "../utility/auth";
const router=express.Router();




router.post('/createBook',auth,createBook)
router.get('/getAllBooks',getAllBooks)
router.post('/updatebook',auth,updateBooks)
router.delete('/deleteBook',auth,deleteBook)







export default router;