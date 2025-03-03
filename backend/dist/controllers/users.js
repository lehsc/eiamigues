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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../services/user");
const userRouter = (0, express_1.Router)();
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_1.getUsers)();
    res.json(users).status(200);
}));
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = yield (0, user_1.createUser)(data);
    res.json({ id }).status(201);
}));
userRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id) {
        if (!isNaN(parseInt(req.params.id))) {
            const id = parseInt(req.params.id);
            const user = yield (0, user_1.getUser)(id);
            res.json(user).status(200);
            return;
        }
        res.json({ msg: "id not provided" }).status(400);
        return;
    }
    res.json({ msg: "id not provided" }).status(400);
    return;
}));
userRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = Number(req.params.id);
    data.id = id;
    yield (0, user_1.updateUser)(data);
    res.json({ id }).status(200);
}));
userRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_1.deleteUser)(Number(req.params.id));
    res.json({ isDeleted: result }).status(200);
}));
exports.default = userRouter;
