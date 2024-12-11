"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pieceJointeController_1 = require("../controllers/pieceJointeController");
const router = express_1.default.Router();
// router.post("/upload", upload.single("file"), pieceJointeController.upload);
// router.get("/activite/:activiteId", pieceJointeController.getByActiviteId);
router.delete("/:id", pieceJointeController_1.pieceJointeController.delete);
exports.default = router;
