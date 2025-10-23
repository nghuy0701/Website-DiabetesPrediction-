import { Request, Response, NextFunction } from 'express';
declare module 'express-session' {
    interface SessionData {
        user?: {
            userId: string;
            username: string;
            role: string;
        };
    }
}
interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    phone?: string;
}
interface CreateUserResponse {
    message: string;
    data: any;
}
interface VerifyEmailRequest {
    email: string;
    token: string;
}
interface VerifyEmailResponse {
    message: string;
    data: any;
}
interface LoginRequest {
    username: string;
    password: string;
}
interface LoginResponse {
    message: string;
    data: any;
}
interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    phone?: string;
}
interface UpdateProfileResponse {
    message: string;
    data: any;
}
export type { CreateUserRequest, CreateUserResponse, VerifyEmailRequest, VerifyEmailResponse, LoginRequest, LoginResponse, UpdateProfileRequest, UpdateProfileResponse };
export declare const userController: {
    createNew: (req: Request<{}, {}, CreateUserRequest, {}>, res: Response<CreateUserResponse>, next: NextFunction) => Promise<void>;
    verifyEmail: (req: Request<{}, {}, VerifyEmailRequest, {}>, res: Response<VerifyEmailResponse>, next: NextFunction) => Promise<void>;
    login: (req: Request<{}, {}, LoginRequest, {}>, res: Response<LoginResponse>, next: NextFunction) => Promise<void>;
    logout: (req: Request, res: Response, next: NextFunction) => void;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: Request<{}, {}, UpdateProfileRequest, {}>, res: Response<UpdateProfileResponse>, next: NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=userController.d.ts.map