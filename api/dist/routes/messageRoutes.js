"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const multerConfig_1 = require("../config/multerConfig");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.post("/direct", multerConfig_1.upload.single("file"), messageController_1.default.sendDirectMessage);
router.get("/conversation/:otherUserId", messageController_1.default.getConversation);
router.get("/unread-count", messageController_1.default.getUnreadMessagesCount);
router.put("/mark-read/:senderId", messageController_1.default.markMessagesAsRead);
exports.default = router;
