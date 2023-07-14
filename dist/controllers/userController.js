"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utilities_1 = require("../utility/utilities");
const notification_1 = require("../utility/notification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email } = req.body;
        const findUser = await userModel_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                message: `User Already Exists`
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
                role: 'author',
                books: []
            });
            const mainUser = await userModel_1.default.findOne({ email });
            if (mainUser) {
                const html = (0, notification_1.emailHtml)(email, password);
                await (0, notification_1.sendmail)(`${process.env.GMAIL_USER}`, email, 'Welcome', html);
                return res.status(200).json({
                    message: 'User Created Successfully',
                    user: mainUser
                });
            }
            return res.status(400).json({
                message: 'Unable to create user'
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.createUser = createUser;
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
                    user
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
