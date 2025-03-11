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
exports.deletePostAttribute = exports.updatePostAttribute = exports.createPostAttribute = exports.getPostAttribute = exports.getPostAttributes = void 0;
const db_1 = require("../config/db");
const getPostAttributes = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const postAttrib = yield db.query("SELECT * FROM post_attributes ORDER BY id DESC");
    return postAttrib.rows;
});
exports.getPostAttributes = getPostAttributes;
const getPostAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const postAttrib = yield db.query("SELECT * FROM post_attributes WHERE id = $1", [id]);
    if (postAttrib)
        return postAttrib.rows[0];
    return null;
});
exports.getPostAttribute = getPostAttribute;
const createPostAttribute = (postAttrib) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const result = yield db.query("INSERT INTO post_attributes (post_id, attr_id) VALUES ($1, $2) RETURNING id", [postAttrib.post_id, postAttrib.attr_id]);
    if (result.rows[0].id)
        return result.rows[0].id;
    return 0;
});
exports.createPostAttribute = createPostAttribute;
const updatePostAttribute = (postAttrib) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const data = yield (0, exports.getPostAttribute)(postAttrib.id);
    if (data) {
        const result = yield db.query("UPDATE post_attributes SET post_id = $1, attr_id = $2 WHERE id = $3 RETURNING id", [postAttrib.post_id, postAttrib.attr_id, postAttrib.id]);
        if (result.rows[0].id)
            return result.rows[0].id;
        return 0;
    }
    return 0;
});
exports.updatePostAttribute = updatePostAttribute;
const deletePostAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const isDeleted = yield db.query("DELETE FROM post_attributes WHERE id = $1 RETURNING 1 AS RESULT", [id]);
    if (isDeleted)
        return true;
    return false;
});
exports.deletePostAttribute = deletePostAttribute;
