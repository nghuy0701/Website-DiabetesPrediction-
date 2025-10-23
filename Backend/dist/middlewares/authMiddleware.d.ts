import { Request, Response, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    session: Request['session'] & {
        user?: {
            userId: string;
            username: string;
            role: string;
        };
    };
}
export declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const adminMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const doctorMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map