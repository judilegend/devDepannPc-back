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
exports.pieceJointeController = void 0;
const pieceJointeService_1 = require("../services/pieceJointeService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.pieceJointeController = {
    // async upload(req: Request, res: Response) {
    //   try {
    //     const file = req.file;
    //     const { activiteId } = req.body;
    //     if (!file) {
    //       return res.status(400).json({ message: "No file uploaded" });
    //     }
    //     const pieceJointe = await pieceJointeService.create({
    //       activiteId: parseInt(activiteId),
    //       filename: file.filename,
    //       originalName: file.originalname,
    //       path: `/images/${file.filename}`,
    //       mimetype: file.mimetype,
    //       size: file.size,
    //     });
    //     res.status(201).json(pieceJointe);
    //   } catch (error) {
    //     res.status(500).json({ message: "Error uploading file", error });
    //   }
    // },
    // async getByActiviteId(req: Request, res: Response) {
    //   try {
    //     const { activiteId } = req.params;
    //     const pieceJointes = await pieceJointeService.findByActiviteId(
    //       parseInt(activiteId)
    //     );
    //     res.json(pieceJointes);
    //   } catch (error) {
    //     res.status(500).json({ message: "Error fetching attachments", error });
    //   }
    // },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pieceJointe = yield pieceJointeService_1.pieceJointeService.findById(parseInt(id));
                if (!pieceJointe) {
                    return res.status(404).json({ message: "Attachment not found" });
                }
                // Delete file from filesystem
                const filePath = path_1.default.join(__dirname, "../../uploads/images/", pieceJointe.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
                yield pieceJointeService_1.pieceJointeService.delete(parseInt(id));
                res.json({ message: "Attachment deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting attachment", error });
            }
        });
    },
};
