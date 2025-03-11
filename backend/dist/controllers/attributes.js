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
const attribute_1 = require("../services/attribute");
const attribRouter = (0, express_1.Router)();
attribRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attributes = yield (0, attribute_1.getAttributes)();
        res.json(attributes).status(200);
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
attribRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            if (!isNaN(parseInt(req.params.id))) {
                const attribute = yield (0, attribute_1.getAttribute)(Number(req.params.id));
                res.json(attribute).status(200);
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
attribRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attribute = req.body;
        const id = yield (0, attribute_1.createAttribute)(attribute);
        res.json({ id }).status(201);
    }
    catch (error) {
        res.json({ msg: error });
    }
}));
attribRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            if (!isNaN(parseInt(req.params.id))) {
                const data = req.body;
                const id = Number(req.params.id);
                data.id = id;
                yield (0, attribute_1.updateAttribute)(data);
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
attribRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            if (!isNaN(parseInt(req.params.id))) {
                const result = yield (0, attribute_1.deleteAttribute)(Number(req.params.id));
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
exports.default = attribRouter;
