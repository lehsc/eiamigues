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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../services/user");
const app = (0, express_1.default)();
exports.userRouter = (0, express_1.default)().router;
exports.userRouter.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_1.getUsers)();
    res.json(users).status(200);
}));
exports.userRouter.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('About birds');
}));
exports.userRouter.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('About birds');
}));
exports.userRouter.patch('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('About birds');
}));
exports.userRouter.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('About birds');
}));
