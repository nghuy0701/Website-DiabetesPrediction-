import { Request, Response, NextFunction } from 'express';
interface CreatePredictionRequest {
    pregnancies?: number;
    glucose: number;
    bloodPressure: number;
    skinThickness?: number;
    insulin?: number;
    bmi: number;
    diabetesPedigreeFunction?: number;
    age: number;
    notes?: string;
}
interface CreatePredictionResponse {
    message: string;
    data: any;
}
interface GetPredictionsResponse {
    message: string;
    data: any;
}
interface GetPredictionByIdResponse {
    message: string;
    data: any;
}
interface UpdatePredictionRequest {
    doctorNotes?: string;
    reviewed?: boolean;
    recommendations?: string[];
}
interface UpdatePredictionResponse {
    message: string;
    data: any;
}
export type { CreatePredictionRequest, CreatePredictionResponse, GetPredictionsResponse, GetPredictionByIdResponse, UpdatePredictionRequest, UpdatePredictionResponse };
export declare const predictionController: {
    createPrediction: (req: Request<{}, {}, CreatePredictionRequest, {}>, res: Response<CreatePredictionResponse>, next: NextFunction) => Promise<void>;
    getUserPredictions: (req: Request, res: Response<GetPredictionsResponse>, next: NextFunction) => Promise<void>;
    getPredictionById: (req: Request<{
        id: string;
    }, {}, {}, {}>, res: Response<GetPredictionByIdResponse>, next: NextFunction) => Promise<void>;
    getAllPredictions: (req: Request, res: Response<GetPredictionsResponse>, next: NextFunction) => Promise<void>;
    updatePrediction: (req: Request<{
        id: string;
    }, {}, UpdatePredictionRequest, {}>, res: Response<UpdatePredictionResponse>, next: NextFunction) => Promise<void>;
    deletePrediction: (req: Request<{
        id: string;
    }, {}, {}, {}>, res: Response, next: NextFunction) => Promise<void>;
    getPredictionStatistics: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=predictionController.d.ts.map