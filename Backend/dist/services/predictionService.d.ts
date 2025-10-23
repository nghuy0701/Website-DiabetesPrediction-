type PredictionInput = {
    pregnancies?: number;
    glucose: number;
    bloodPressure: number;
    skinThickness?: number;
    insulin?: number;
    bmi: number;
    diabetesPedigreeFunction?: number;
    age: number;
    notes?: string;
};
export declare const predictionService: {
    createPrediction: (userId: string, inputData: PredictionInput) => Promise<any>;
    getUserPredictions: (userId: string) => Promise<any>;
    getPredictionById: (predictionId: string, userId: string) => Promise<any>;
    getAllPredictions: () => Promise<any>;
    updatePrediction: (predictionId: string, updateData: any, userId: string, userRole: string) => Promise<any>;
    deletePrediction: (predictionId: string, userId: string, userRole: string) => Promise<void>;
    getPredictionStatistics: (userId: string) => Promise<any>;
};
export {};
//# sourceMappingURL=predictionService.d.ts.map