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
exports.deleteWorkPackage = exports.updateWorkPackage = exports.getWorkPackageById = exports.getWorkPackagesByProjectId = exports.createWorkPackage = void 0;
const workpackage_1 = __importDefault(require("../models/workpackage"));
const activite_1 = __importDefault(require("../models/activite"));
const createWorkPackage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const workPackage = yield workpackage_1.default.create(data);
    return workPackage;
});
exports.createWorkPackage = createWorkPackage;
const getWorkPackagesByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const workPackages = yield workpackage_1.default.findAll({
        where: { projectId },
        include: [{ model: activite_1.default, as: "activities" }],
    });
    return workPackages;
});
exports.getWorkPackagesByProjectId = getWorkPackagesByProjectId;
const getWorkPackageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const workPackage = yield workpackage_1.default.findByPk(id, {
        include: [{ model: activite_1.default, as: "activities" }],
    });
    return workPackage;
});
exports.getWorkPackageById = getWorkPackageById;
const updateWorkPackage = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const workPackage = yield workpackage_1.default.findByPk(id);
    if (!workPackage)
        throw new Error("WorkPackage not found");
    return workPackage.update(data);
});
exports.updateWorkPackage = updateWorkPackage;
const deleteWorkPackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const workPackage = yield workpackage_1.default.findByPk(id);
    if (!workPackage)
        throw new Error("WorkPackage not found");
    yield workPackage.destroy();
});
exports.deleteWorkPackage = deleteWorkPackage;
