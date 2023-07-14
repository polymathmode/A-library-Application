"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
(0, database_1.connectDatabase)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('start'));
app.use((0, cookie_parser_1.default)());
app.use('/user', userRoutes_1.default);
app.use('/book', bookRoutes_1.default);
dotenv_1.default.config();
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on ${process.env.PORT || 4000}`);
});
exports.default = app;
//0pxPKuU83zYizLCx
