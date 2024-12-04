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
exports.authorizeClient = exports.authorizeAdmin = exports.authenticate = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Add verifyToken function for socket authentication
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
});
exports.verifyToken = verifyToken;
// Middleware d'authentification
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});
exports.authenticate = authenticate;
// Middleware d'autorisation (vérifier le rôle admin)
const authorizeAdmin = (req, res, next) => {
    var _a;
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.role);
        return res
            .status(403)
            .json({ message: "Access denied. Admin role required." });
    }
};
exports.authorizeAdmin = authorizeAdmin;
const authorizeClient = (req, res, next) => {
    if (req.user && req.user.role === "client") {
        next();
    }
    else {
        // console.log(req.user?.role);
        return res
            .status(403)
            .json({ message: "Access denied. client or admin  role required." });
    }
};
exports.authorizeClient = authorizeClient;
