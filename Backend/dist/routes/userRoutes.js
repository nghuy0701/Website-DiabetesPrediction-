"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.post('/register', controllers_1.userController.createNew);
router.post('/verify-email', controllers_1.userController.verifyEmail);
router.post('/login', controllers_1.userController.login);
// Protected routes
router.use(authMiddleware_1.authMiddleware); // Apply authentication middleware to all routes below
router.get('/profile', controllers_1.userController.getProfile);
router.put('/profile', controllers_1.userController.updateProfile);
router.post('/logout', controllers_1.userController.logout);
// Admin routes
router.get('/users', controllers_1.userController.getAllUsers); // TODO: Add admin middleware
exports.userRoutes = router;
//# sourceMappingURL=userRoutes.js.map