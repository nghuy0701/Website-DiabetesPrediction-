"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}
const errorHandler = (err, req, res, next) => {
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Đã xảy ra lỗi không mong muốn';
    if ('statusCode' in err) {
        statusCode = err.statusCode;
        message = err.message;
    }
    console.error(`❌ Error ${statusCode}:`, err.message);
    res.status(statusCode).json({
        error: true,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;
exports.default = CustomApiError;
//# sourceMappingURL=errorHandler.js.map