"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const http_status_codes_1 = require("http-status-codes");
const userService_1 = require("../services/userService");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// ===== CONTROLLERS =====
const createNew = async (req, res, next) => {
    try {
        const createUser = await userService_1.userService.createNew(req);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: 'Tạo tài khoản người dùng thành công',
            data: createUser
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const verifyEmail = async (req, res, next) => {
    try {
        const result = await userService_1.userService.verifyEmail(req);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Xác thực email thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const login = async (req, res, next) => {
    try {
        const result = await userService_1.userService.login(req);
        if (result) {
            req.session.user = {
                userId: result._id.toString(),
                username: result.username,
                role: result.role
            };
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Đăng nhập thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const getProfile = async (req, res, next) => {
    try {
        const result = await userService_1.userService.getProfile(req);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Lấy thông tin hồ sơ cá nhân thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const updateProfile = async (req, res, next) => {
    try {
        const result = await userService_1.userService.updateProfile(req);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Cập nhật hồ sơ cá nhân thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const logout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message));
            }
            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax')
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Đăng xuất thành công'
            });
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService_1.userService.getAllUsers();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Lấy danh sách người dùng thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
exports.userController = {
    createNew,
    verifyEmail,
    login,
    logout,
    getProfile,
    updateProfile,
    getAllUsers
};
//# sourceMappingURL=userController.js.map