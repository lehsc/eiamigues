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
exports.deleteAttribute = exports.updateAttribute = exports.createAttribute = exports.getAttribute = exports.getAttributes = void 0;
const db_1 = require("../config/db");
const getAttributes = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const attributes = yield db.query("SELECT * FROM attributes ORDER BY id DESC");
    return attributes.rows;
});
exports.getAttributes = getAttributes;
const getAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const attribute = yield db.query("SELECT * FROM attributes WHERE id = $1", [id]);
    if (attribute)
        return attribute.rows[0];
    return null;
});
exports.getAttribute = getAttribute;
const createAttribute = (attribute) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const result = yield db.query("INSERT INTO attributes (name) VALUES ($1) RETURNING id", [attribute.name]);
    if (result.rows[0].id)
        return result.rows[0].id;
    return 0;
});
exports.createAttribute = createAttribute;
const updateAttribute = (attribute) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const data = yield (0, exports.getAttribute)(attribute.id);
    if (data) {
        const result = yield db.query("UPDATE attributes SET name = $1 WHERE id = $2 RETURNING id", [attribute.name, attribute.id]);
        if (result.rows[0].id)
            return result.rows[0].id;
        return 0;
    }
    return 0;
});
exports.updateAttribute = updateAttribute;
const deleteAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectdb)();
    const isDeleted = yield db.query("DELETE FROM attributes WHERE id = $1 RETURNING 1 AS RESULT", [id]);
    if (isDeleted)
        return true;
    return false;
});
exports.deleteAttribute = deleteAttribute;
//# sourceMappingURL=attribute.js.map