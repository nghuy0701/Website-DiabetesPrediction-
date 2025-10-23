import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    session: Request['session'] & {
        user?: {
            userId: string;
            username: string;
            role: string;
        };
    };
    body: any;
}
export declare const userService: {
    createNew: (req: Request) => Promise<any>;
    verifyEmail: (req: Request) => Promise<any>;
    login: (req: Request) => Promise<any>;
    getProfile: (req: AuthenticatedRequest) => Promise<any>;
    updateProfile: (req: AuthenticatedRequest) => Promise<any>;
    getAllUsers: () => Promise<any>;
};
export {};
//# sourceMappingURL=userService.d.ts.map