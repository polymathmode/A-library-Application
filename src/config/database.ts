import mongoose from "mongoose";


 export const connectDatabase=async()=>{
    try{
        const connection=mongoose.connect(`mongodb+srv://ogbedigbo:0pxPKuU83zYizLCx@cluster0.w7mmlcd.mongodb.net/books`)
        console.log(`MongoDB Connected Successfully`);
        
    }catch(err){
        console.log(err);
        
    }
 }