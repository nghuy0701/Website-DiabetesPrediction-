"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8017,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/diabetes_prediction_db',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    SESSION_SECRET: process.env.SESSION_SECRET || 'your_session_secret_here',
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
    EMAIL_USER: process.env.EMAIL_USER || '',
    EMAIL_PASS: process.env.EMAIL_PASS || '',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    BUILD_MODE: process.env.NODE_ENV || 'development'
};
//# sourceMappingURL=environment.js.map