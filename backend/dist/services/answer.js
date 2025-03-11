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
exports.deleteAnswer = exports.updateAnswer = exports.createAnswer = exports.getAnswer = exports.getAnswers = void 0;
const db_1 = require("../config/db");
const getAnswers = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const answers = yield db.query("SELECT * FROM answers ORDER BY id DESC");
    return answers.rows;
});
exports.getAnswers = getAnswers;
const getAnswer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const Answer = yield db.query("SELECT * FROM answers WHERE id = $1", [id]);
    if (Answer)
        return Answer.rows[0];
    return null;
});
exports.getAnswer = getAnswer;
const createAnswer = (answer) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const result = yield db.query("INSERT INTO answers (user_id, post_id, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id", [answer.user_id, answer.post_id, answer.content, answer.created_at, answer.updated_at]);
    if (result.rows[0].id)
        return result.rows[0].id;
    return 0;
});
exports.createAnswer = createAnswer;
const updateAnswer = (answer) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const data = yield (0, exports.getAnswer)(answer.id);
    if (data) {
        const result = yield db.query("UPDATE answers SET user_id = $1, post_id = $2, content = $3, created_at = $4, updated_at = $5 WHERE id = $6 RETURNING id", [answer.user_id, answer.post_id, answer.content, answer.created_at, answer.updated_at, answer.id]);
        if (result.rows[0].id)
            return result.rows[0].id;
        return 0;
    }
    return 0;
});
exports.updateAnswer = updateAnswer;
const deleteAnswer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const isDeleted = yield db.query("DELETE FROM answers WHERE id = $1 RETURNING 1 AS RESULT", [id]);
    if (isDeleted)
        return true;
    return false;
});
exports.deleteAnswer = deleteAnswer;
