"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorMiddleware = exports.adminMiddleware = exports.authMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const authMiddleware = (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Vui lòng đăng nhập để truy cập');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Vui lòng đăng nhập để truy cập');
        }
        if (req.session.user.role !== 'admin') {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Bạn không có quyền truy cập tính năng này');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.adminMiddleware = adminMiddleware;
const doctorMiddleware = (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Vui lòng đăng nhập để truy cập');
        }
        if (!['doctor', 'admin'].includes(req.session.user.role)) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Chỉ bác sĩ mới có thể truy cập tính năng này');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.doctorMiddleware = doctorMiddleware;
//# sourceMappingURL=authMiddleware.js.map