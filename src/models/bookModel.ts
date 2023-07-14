import mongoose, {Schema}  from "mongoose";
 



export interface IBook{
        _id:string,
        title:string,
        author:string
        datePublished:string
        description:string
        pageCount:number
        genre:string
        bookId:string
        publisher:string
    
}

const bookSchema=new Schema({
    title:{
     type:String,
     require:[true]
    },
    author:{
        type:String,
        require:[true]
    },
    datePublished:{
        type:String,
        require:[true]
    },
    description:{
        type:String,
        require:[true]
    },
    pageCount:{
        type:String,
        require:[false]
    },
    genre:{
        type:String,
        require:[true]
    },
    bookId:{
        type:String,
        require:[false]
    },
    publisher:{
        type:String,
        require:[false]
    },
    
},{
    timestamps:true
})
export const Book= mongoose.model<IBook>('Book',bookSchema)

export default Book