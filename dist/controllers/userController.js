"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const validation_1 = require("../utility/validation");
const utilities_1 = require("../utility/utilities");
const notification_1 = require("../utility/notification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (req, res, next) => {
    try {
        // Validate the incoming user data using the Joi schema
        const { error, value } = validation_1.userValidationSchema.validate(req.body);
        if (error) {
            // If validation fails, return the error to the client
            return res.status(400).json({ message: error.details[0].message });
        }
        const { first_name, last_name, email } = value;
        const findUser = await userModel_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                message: `User Already Exists`,
            });
        }
        const salt = await (0, utilities_1.saltGenerator)();
        const password = await (0, utilities_1.passwordGenerator)(last_name);
        const hashedPassword = await (0, utilities_1.hashPassword)(password, salt);
        if (!findUser) {
            let newUser = await userModel_1.default.create({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role: "",
                books: [],
            });
            const html = (0, notification_1.emailHtml)(email, password);
            await (0, notification_1.sendmail)(`${process.env.GMAIL_USER}`, email, 'Welcome', html);
            return res.status(200).json({
                message: 'User Created Successfully',
                newUser,
            });
        }
        return res.status(400).json({
            message: 'Unable to create user',
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
        });
    }
};
exports.createUser = createUser;
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
const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User does not exist,sign up here!'
            });
        }
        if (user) {
            const validate = await bcryptjs_1.default.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({
                    message: 'Invalid Password'
                });
            }
            if (validate) {
                const token = await (0, utilities_1.tokenFGenerator)(`${user._id}`);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: 'Logged In Successfully',
                    user,
                    token
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
exports.logIn = logIn;
