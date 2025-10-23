"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./userRoutes");
const predictionRoutes_1 = require("./predictionRoutes");
const router = express_1.default.Router();
// API Routes
router.use('/auth', userRoutes_1.userRoutes);
router.use('/predictions', predictionRoutes_1.predictionRoutes);
// API Info
router.get('/', (req, res) => {
    res.json({
        message: 'Diabetes Prediction API v1.0',
        status: 'Active',
        endpoints: {
            auth: '/api/v1/auth',
            predictions: '/api/v1/predictions'
        },
        documentation: 'https://github.com/your-repo/diabetes-prediction-api'
    });
});
exports.routes = router;
//# sourceMappingURL=index.js.map