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
exports.deleteActivite = exports.updateActivite = exports.createActivite = exports.getActivitesByWorkPackageId = void 0;
const activite_1 = __importDefault(require("../models/activite"));
const getActivitesByWorkPackageId = (workPackageId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activite_1.default.findAll({
        where: { workPackageId },
        order: [["createdAt", "DESC"]],
    });
});
exports.getActivitesByWorkPackageId = getActivitesByWorkPackageId;
const createActivite = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activite_1.default.create(data);
});
exports.createActivite = createActivite;
const updateActivite = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const activite = yield activite_1.default.findByPk(id);
    if (!activite)
        throw new Error("Activite not found");
    return yield activite.update(data);
});
exports.updateActivite = updateActivite;
const deleteActivite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const activite = yield activite_1.default.findByPk(id);
    if (!activite)
        throw new Error("Activite not found");
    yield activite.destroy();
});
exports.deleteActivite = deleteActivite;
