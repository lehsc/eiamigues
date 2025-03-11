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
const post_1 = require("../services/post");
const postRouter = (0, express_1.Router)();
postRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_1.getPosts)();
        res.json(posts).status(200);
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
postRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            if (!isNaN(parseInt(req.params.id))) {
                const post = yield (0, post_1.getPost)(Number(req.params.id));
                res.json(post).status(200);
            }
            res.json({ msg: "id not provided" }).status(400);
            return;
        }
        res.json({ msg: "id not provided" }).status(400);
        return;
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
postRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = req.body;
        const id = yield (0, post_1.createPost)(post);
        res.json({ id }).status(201);
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
postRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            if (!isNaN(parseInt(req.params.id))) {
                const data = req.body;
                const id = Number(req.params.id);
                data.id = id;
                yield (0, post_1.updatePost)(data);
                res.json({ id }).status(200);
                return;
            }
            res.json({ msg: "id not provided" }).status(400);
            return;
        }
        res.json({ msg: "id not provided" }).status(400);
        return;
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
postRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            if (!isNaN(parseInt(req.params.id))) {
                const result = yield (0, post_1.deletePost)(Number(req.params.id));
                res.json({ isDeleted: result }).status(200);
                return;
            }
            res.json({ msg: "id not provided" }).status(400);
            return;
        }
        res.json({ msg: "id not provided" }).status(400);
        return;
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
exports.default = postRouter;
