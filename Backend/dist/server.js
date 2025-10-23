"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const environment_1 = require("./configs/environment");
const database_1 = require("./configs/database");
const errorHandler_1 = require("./middlewares/errorHandler");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// Connect to Database
(0, database_1.connectDB)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: environment_1.env.CLIENT_URL,
    credentials: true
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
// Session configuration
app.use((0, express_session_1.default)({
    secret: environment_1.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: environment_1.env.MONGODB_URI
    }),
    cookie: {
        secure: environment_1.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));
// Routes
app.use('/api/v1', routes_1.routes);
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Diabetes Prediction API is running',
        timestamp: new Date().toISOString()
    });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'API endpoint không tồn tại',
        path: req.originalUrl
    });
});
const PORT = environment_1.env.PORT || 8017;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại port ${PORT}`);
    console.log(`📊 Diabetes Prediction API: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
exports.default = app;
//# sourceMappingURL=server.js.map