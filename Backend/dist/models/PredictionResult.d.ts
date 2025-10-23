import mongoose, { Document } from 'mongoose';
export interface IPredictionResult extends Document {
    userId: mongoose.Types.ObjectId;
    healthDataId: mongoose.Types.ObjectId;
    predictionScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    confidence: number;
    modelVersion: string;
    inputFeatures: {
        pregnancies?: number;
        glucose: number;
        bloodPressure: number;
        skinThickness?: number;
        insulin?: number;
        bmi: number;
        diabetesPedigreeFunction?: number;
        age: number;
    };
    recommendations?: string[];
    doctorNotes?: string;
    reviewed: boolean;
    reviewedBy?: mongoose.Types.ObjectId;
    reviewedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PredictionResult: mongoose.Model<IPredictionResult, {}, {}, {}, mongoose.Document<unknown, {}, IPredictionResult> & IPredictionResult & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=PredictionResult.d.ts.map