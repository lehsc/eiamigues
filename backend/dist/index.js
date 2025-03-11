"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./controllers/users"));
const posts_1 = __importDefault(require("./controllers/posts"));
const attributes_1 = __importDefault(require("./controllers/attributes"));
const post_attributes_1 = __importDefault(require("./controllers/post_attributes"));
const answers_1 = __importDefault(require("./controllers/answers"));
dotenv_1.default.config(); // loads the environment variables from a .env file into process.env
const app = (0, express_1.default)(); // creates an Express instance
const port = process.env.PORT;
// Middleware configuration
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // converts the incoming data into a JS obj and makes it accessible through req.body
app.use((0, cors_1.default)());
// Routes
app.use('/user', users_1.default);
app.use('/attribute', attributes_1.default);
app.use('/post', posts_1.default);
app.use('/post_attribute', post_attributes_1.default);
app.use('/answer', answers_1.default);
// Root route
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Express ");
}));
// Starting the server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
