"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupMessageController_1 = __importDefault(require("../controllers/groupMessageController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const multerConfig_1 = require("../config/multerConfig");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
// Room management
router.post("/rooms", groupMessageController_1.default.createRoom);
router.get("/rooms", groupMessageController_1.default.getUserRooms);
// router.get("/rooms/:roomId", groupMessageController.getRoomDetails);
router.delete("/rooms/:roomId", groupMessageController_1.default.deleteRoom);
// Messages
router.get("/rooms/:roomId/messages", groupMessageController_1.default.getRoomMessages);
router.post("/rooms/:roomId/messages", multerConfig_1.upload.single("file"), groupMessageController_1.default.sendGroupMessage);
// Unread messages
router.get("/rooms/unread-count", groupMessageController_1.default.getUnreadGroupMessagesCount);
router.put("/rooms/:roomId/mark-read", groupMessageController_1.default.markGroupMessagesAsRead);
// Members
router.post("/rooms/:roomId/members", groupMessageController_1.default.addMembersToRoom);
router.delete("/rooms/:roomId/members/:userId", groupMessageController_1.default.removeUserFromRoom);
exports.default = router;
