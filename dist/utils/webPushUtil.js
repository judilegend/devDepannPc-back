"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWebPush = void 0;
const web_push_1 = __importDefault(require("web-push"));
const initializeWebPush = () => {
    web_push_1.default.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
};
exports.initializeWebPush = initializeWebPush;
