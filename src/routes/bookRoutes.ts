import express from "express";
import {createUser} from "../controllers/userController";
import { createBook, deleteBook, getAllUsers, updateBooks } from "../controllers/booksController";
import { auth } from "../utility/auth";
const router=express.Router();




router.post('/createBook',auth,createBook)
router.get('/getAllBooks',auth,getAllUsers)
router.post('/updatebook',auth,updateBooks)
router.delete('/deleteBook',auth ,deleteBook)







export default router;