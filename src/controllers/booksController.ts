import express from "express";
import {Request,Response} from "express";
import User from "../models/userModel"
import { Book } from "../models/bookModel";
import {v4}   from "uuid"


export const createBook=async(req:Request, res:Response)=>{
   try{
        const { title,author,genre }=req.body
        const findBook=await Book.findOne({title})
        if(findBook){
      return res.status(401).json({
    message:`Book already exists!`
      })

       }if(!findBook){
      const newBook=await Book.create({
    title,
    author,
    datePublished:new Date(),
    description:"description",
    pageCount:"pageCount",
    genre,
    bookId:v4(),
    publisher:"publisher"
       })
       const mainBook=await Book.findOne({title})
       if(mainBook){
        res.status(200).json({
          message:`Book Created Successfully`,
          mainBook
        })
       }
 }

    }catch(err){
        return res.status(500).json({
            message:`Internal Server Mistake`
        })
       }

}

export const getAllUsers=async(req:Request,res:Response)=>{
   try{
    const books=await Book.find({})
   if(!books){
   return res.status(404).json({
    message:`Book not available`
   })
   }
   if(books){
    return res.status(200).json({
      message:`Here's a list of available books`,
      books
    })
   }

   }catch(err){
    console.log(err);
    
   }

  }

  export const updateBooks=async(req:Request,res:Response)=>{
      try{
        const {title,author,genre,bookId}=req.body
        const updateBook=await Book.find({title})
        if(!updateBook){
       return res.status(404).json({
        message:`Book not available`
       })
        }
        if(updateBook){
          const finalUpdate=await Book.findOneAndUpdate({title})
          if(finalUpdate){
            return res.status(200).json({
              message:`Book Updated Successfully`,
              finalUpdate
            })
          }
        }
 

      }catch(err){
return res.status(500).json({
  message:`Internal Server Error`
})        
      }
  }

  export const deleteBook=async(req:Request,res:Response)=>{
     try{
    const {title,genre}=req.body;
    const deleteBook=await Book.find({title})

if(!deleteBook){
return res.status(404).json({
  message:`Book unavailable`
})
}if(deleteBook){
  const deleteOne=await Book.deleteOne({title})
  if(deleteOne){
    return res.status(200).json({
      message:`Book Deleted Successsfully`,
      deleteBook
    })
  }
}
     }catch(err){
      return res.status(500).json({
        message:`Internal Server Error`
      })
     }
  }

