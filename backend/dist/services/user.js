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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const db_1 = require("../config/db");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const users = yield db.query("SELECT * FROM users order by id desc");
    return users.rows;
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const user = yield db.query("SELECT * FROM users where id = $1", [id]);
    if (user)
        return user.rows[0];
    return null;
});
exports.getUser = getUser;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const result = yield db.query('INSERT INTO users (name, dob, gender, email, pwd, anonymous) VALUES ($1, $2, $3, $4, $5, $6) returning id', [userData.name, userData.dob, userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0]);
    if (result.rows[0].id)
        return result.rows[0].id;
    return 0;
});
exports.createUser = createUser;
const updateUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const user = yield (0, exports.getUser)(userData.id);
    if (user) {
        const result = yield db.query('UPDATE users SET name = $1, dob = $2, gender = $3, email = $4, pwd = $5, anonymous = $6 WHERE id = $7 returning id', [userData.name, userData.dob, userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0, userData.id]);
        if (result.rows[0].id)
            return user.id;
        return 0;
    }
    return 0;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const isDeleted = yield db.query('DELETE FROM users WHERE id = $1 returning 1 as result', [id]);
    if (isDeleted)
        return true;
    return false;
});
exports.deleteUser = deleteUser;
