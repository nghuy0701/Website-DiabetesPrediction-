import mongoose, { Document } from 'mongoose';
export interface IHealthData extends Document {
    userId: mongoose.Types.ObjectId;
    pregnancies?: number;
    glucose: number;
    bloodPressure: number;
    skinThickness?: number;
    insulin?: number;
    bmi: number;
    diabetesPedigreeFunction?: number;
    age: number;
    recordedAt: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const HealthData: mongoose.Model<IHealthData, {}, {}, {}, mongoose.Document<unknown, {}, IHealthData> & IHealthData & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=HealthData.d.ts.map