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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const db_1 = require("../config/db");
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const posts = yield db.query("SELECT * FROM posts ORDER BY id DESC");
    return posts.rows;
});
exports.getPosts = getPosts;
const getPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const post = yield db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (post)
        return post.rows[0];
    return null;
});
exports.getPost = getPost;
const createPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const result = yield db.query("INSERT INTO posts (user_id, title, content, created_at) VALUES ($1, $2, $3, $4) RETURNING id", [post.user_id, post.title, post.content, post.created_at]);
    if (result.rows[0].id)
        return result.rows[0].id;
    return 0;
});
exports.createPost = createPost;
const updatePost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const data = yield (0, exports.getPost)(post.id);
    if (data) {
        const result = yield db.query("UPDATE posts SET user_id = $1, title = $2, content = $3, created_at = $4 WHERE id = $5 RETURNING id", [post.user_id, post.title, post.content, post.created_at, post.id]);
        if (result.rows[0].id)
            return result.rows[0].id;
        return 0;
    }
    return 0;
});
exports.updatePost = updatePost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const isDeleted = yield db.query("DELETE FROM posts WHERE id = $1 RETURNING 1 AS RESULT", [id]);
    if (isDeleted)
        return true;
    return false;
});
exports.deletePost = deletePost;
