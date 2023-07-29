import mongoose,{Schema} from "mongoose";
import { IBook, bookSchema } from "./bookModel";


export  interface IUser {
    _id:string;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    role:string;
    books:[IBook];

}

const userSchema=new Schema({
    first_name:{
        type:String,
        require:[true,`Please input first name`]
    },
    last_name:{
        type:String,
        require:[true,`Please input last name`]
    },
    email:{
        type:String,
        require:[true,`Please email address`]
    },
    password:{
        type:String,
        require:[false]
    },
    role:{
        type:String
                
    },
    books:{
        type:[bookSchema],
        require:false
    },
});

const User=mongoose.model<IUser>('User',userSchema);


export default User;