"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// All prediction routes require authentication
router.use(authMiddleware_1.authMiddleware);
// User prediction routes
router.post('/', controllers_1.predictionController.createPrediction);
router.get('/my-predictions', controllers_1.predictionController.getUserPredictions);
router.get('/statistics', controllers_1.predictionController.getPredictionStatistics);
router.get('/:id', controllers_1.predictionController.getPredictionById);
router.put('/:id', controllers_1.predictionController.updatePrediction);
router.delete('/:id', controllers_1.predictionController.deletePrediction);
// Doctor/Admin routes
router.get('/', authMiddleware_1.doctorMiddleware, controllers_1.predictionController.getAllPredictions);
exports.predictionRoutes = router;
//# sourceMappingURL=predictionRoutes.js.map