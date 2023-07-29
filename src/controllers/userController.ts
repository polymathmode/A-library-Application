
import User from '../models/userModel'
import Book from '../models/bookModel';
import { userValidationSchema } from '../utility/validation';
import { Request,Response,NextFunction } from "express";
import { saltGenerator,hashPassword,tokenFGenerator, passwordGenerator } from '../utility/utilities';
import {emailHtml,sendmail} from '../utility/notification'
import bcryptjs from 'bcryptjs';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the incoming user data using the Joi schema
      const { error, value } = userValidationSchema.validate(req.body);
  
      if (error) {
        // If validation fails, return the error to the client
        return res.status(400).json({ message:error.details[0].message });
      }
  
      const { first_name, last_name, email } = value;
      const findUser = await User.findOne({ email });
  
      if (findUser) {
        return res.status(400).json({
          message: `User Already Exists`,
        });
      }
  
      const salt = await saltGenerator();
      const password = await passwordGenerator(last_name);
      const hashedPassword = await hashPassword(password, salt);
  
      if (!findUser) {
        let newUser = await User.create({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          role:"",
          books: [],
        });
  
        const html = emailHtml(email, password);
        await sendmail(`${process.env.GMAIL_USER}`, email,'Welcome', html);
        return res.status(200).json({
          message: 'User Created Successfully',
          newUser,
        });
      }
      return res.status(400).json({
        message: 'Unable to create user',
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal Server Error`,
      });
    }
  };
// export const createUser = async (req:Request,res:Response,next:NextFunction)=>{

//      try{
//   const {first_name,last_name,email}=req.body
   
//   const findUser=await User.findOne({email})
//   if(findUser){
//  return res.status(400).json({
//     message:`User Already Exists`
//  })
//   }
//   const salt = await saltGenerator()
//   const password=await passwordGenerator(last_name);
//   const hashedPassword=await hashPassword(password, salt);

//   if(!findUser){
//     let newUser=await User.create({
//         first_name, 
//         last_name,
//         email,
//         password:hashedPassword,
//         role:'',
//         books:[]
//     })

//     const html=emailHtml(email,password)
//         await sendmail(email ,html)
//         return res.status(200).json({
//                     message:'User Created Successfully',
//                     user:newUser
//                 })
  
// }

// return res.status(400).json({
//     message:'Unable to create user'
// })
//      }catch(err){
//        return res.status(500).json({
//             message:`Internal Server Error`
//         })
//      }

// }

export const logIn= async(req:Request,res:Response,next:NextFunction)=>{
    try{
  
      const {email,password}=req.body
      const user=await User.findOne({email})
      if(!user){
          return res.status(404).json({
                      message:'User does not exist,sign up here!'
                  })
      }
      if(user){
          const validate=await bcryptjs.compare(password,user.password)
          if(!validate){
              return res.status(400).json({
                  message:'Invalid Password'
  
              })
          }if(validate){
              const token=await tokenFGenerator(`${user._id}`)
              res.cookie(`token`,token)
              return res.status(200).json({
                  message:'Logged In Successfully',
                  user,
                  token
              })
      }
  }
  
    }catch(err){
      return res.status(500).json({
          message:`Internal Server Error`
      })
    }
    }