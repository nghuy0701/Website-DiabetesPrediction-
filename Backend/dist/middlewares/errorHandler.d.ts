import { Request, Response, NextFunction } from 'express';
export interface ApiError extends Error {
    statusCode: number;
}
declare class CustomApiError extends Error implements ApiError {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare const errorHandler: (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => void;
export default CustomApiError;
//# sourceMappingURL=errorHandler.d.ts.map