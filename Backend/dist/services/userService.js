"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const models_1 = require("../models");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = __importDefault(require("crypto"));
const emailService_1 = require("../utils/emailService");
const createNew = async (req) => {
    try {
        const { username, email, password, firstName, lastName, age, gender, phone } = req.body;
        // Check if user already exists
        const existingUser = await models_1.User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Tên người dùng hoặc email đã tồn tại');
        }
        // Generate email verification token
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const newUser = new models_1.User({
            username,
            email,
            password,
            firstName,
            lastName,
            age,
            gender,
            phone,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires
        });
        await newUser.save();
        // Send verification email
        await (0, emailService_1.sendVerificationEmail)(email, verificationToken);
        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            age: newUser.age,
            gender: newUser.gender,
            phone: newUser.phone,
            role: newUser.role,
            isEmailVerified: newUser.isEmailVerified
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const verifyEmail = async (req) => {
    try {
        const { email, token } = req.body;
        const user = await models_1.User.findOne({
            email,
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() }
        });
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Token xác thực không hợp lệ hoặc đã hết hạn');
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();
        return {
            message: 'Email đã được xác thực thành công',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const login = async (req) => {
    try {
        const { username, password } = req.body;
        // Find user and include password for comparison
        const user = await models_1.User.findOne({
            $or: [{ username }, { email: username }]
        }).select('+password');
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Tên người dùng hoặc mật khẩu không đúng');
        }
        if (!user.isEmailVerified) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Vui lòng xác thực email trước khi đăng nhập');
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Tên người dùng hoặc mật khẩu không đúng');
        }
        // Return user without password
        const userWithoutPassword = await models_1.User.findById(user._id);
        return userWithoutPassword;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, error.message);
    }
};
const getProfile = async (req) => {
    try {
        const { userId } = req.session.user;
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Người dùng không tồn tại');
        }
        return user;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const updateProfile = async (req) => {
    try {
        const { userId } = req.session.user;
        const updateData = req.body;
        // Remove sensitive fields that shouldn't be updated here
        delete updateData.password;
        delete updateData.email;
        delete updateData.username;
        delete updateData.role;
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Người dùng không tồn tại');
        }
        return updatedUser;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const getAllUsers = async () => {
    try {
        const users = await models_1.User.find()
            .select('-password -emailVerificationToken -emailVerificationExpires')
            .sort({ createdAt: -1 });
        return {
            users,
            total: users.length
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
exports.userService = {
    createNew,
    verifyEmail,
    login,
    getProfile,
    updateProfile,
    getAllUsers
};
//# sourceMappingURL=userService.js.map