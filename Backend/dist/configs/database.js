"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(environment_1.env.MONGODB_URI);
        console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map