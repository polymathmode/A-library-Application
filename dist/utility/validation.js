"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schema for user validation
exports.userValidationSchema = joi_1.default.object({
    first_name: joi_1.default.string().required().label('First Name'),
    last_name: joi_1.default.string().required().label('Last Name'),
    email: joi_1.default.string().email().required().label('Email'),
    password: joi_1.default.string().allow('').label('Password'),
    role: joi_1.default.string().label('Role'),
    books: joi_1.default.array().items(joi_1.default.object()).label('Books'),
});
