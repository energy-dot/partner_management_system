"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApplicationController_1 = __importDefault(require("../controllers/ApplicationController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 応募ルート
router.get('/', authMiddleware_1.authMiddleware, (req, res) => ApplicationController_1.default.getAllApplications(req, res));
router.get('/:id', authMiddleware_1.authMiddleware, (req, res) => ApplicationController_1.default.getApplicationById(req, res));
router.post('/', authMiddleware_1.authMiddleware, (req, res) => ApplicationController_1.default.createApplication(req, res));
router.put('/:id', authMiddleware_1.authMiddleware, (req, res) => ApplicationController_1.default.updateApplication(req, res));
router.post('/:id/approve', authMiddleware_1.authMiddleware, (req, res) => ApplicationController_1.default.approveApplication(req, res));
router.post('/:id/reject', authMiddleware_1.authMiddleware, (req, res) => ApplicationController_1.default.rejectApplication(req, res));
exports.default = router;
