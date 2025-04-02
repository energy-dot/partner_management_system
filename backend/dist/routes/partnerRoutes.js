"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PartnerController_1 = __importDefault(require("../controllers/PartnerController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// パートナー会社ルート
router.get('/', authMiddleware_1.authMiddleware, (req, res) => PartnerController_1.default.getAllPartners(req, res));
router.get('/:id', authMiddleware_1.authMiddleware, (req, res) => PartnerController_1.default.getPartnerById(req, res));
router.post('/', authMiddleware_1.authMiddleware, (req, res) => PartnerController_1.default.createPartner(req, res));
router.put('/:id', authMiddleware_1.authMiddleware, (req, res) => PartnerController_1.default.updatePartner(req, res));
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => PartnerController_1.default.deletePartner(req, res));
exports.default = router;
