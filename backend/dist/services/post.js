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
exports.deletePost = exports.updatePost = exports.createPost = exports.getUserPosts = exports.getPost = exports.getPosts = void 0;
const db_1 = require("../config/db");
const getPosts = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    if (filters) {
        const posts = yield db.query("SELECT * FROM posts WHERE id < $1 ORDER BY id DESC LIMIT $2", [filters.page, filters.offset]);
        return posts.rows;
    }
    const posts = yield db.query("SELECT * FROM posts ORDER BY id DESC LIMIT $1");
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
const getUserPosts = (id, pageId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    if (pageId) {
        const data = yield db.query("SELECT * FROM posts p INNER JOIN users u on p.user_id = u.id WHERE u.id = $1 AND p.id < $2 ORDER BY p.id DESC LIMIT 30", [id, pageId]);
        return data.rows;
    }
    else {
        const data = yield db.query("SELECT * FROM posts p INNER JOIN users u on p.user_id = u.id WHERE u.id = $1 ORDER BY p.id DESC LIMIT 30", [id]);
        return data.rows;
    }
});
exports.getUserPosts = getUserPosts;
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
//# sourceMappingURL=post.js.map