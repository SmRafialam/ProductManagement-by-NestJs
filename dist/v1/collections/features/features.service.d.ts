import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Model } from 'mongoose';
import { Features } from './interface/features.interface';
import { CommonService } from 'src/common/common.service';
export declare class FeaturesService {
    private featureModel;
    private readonly commonService;
    constructor(featureModel: Model<Features>, commonService: CommonService);
    createFeature(featureData: CreateFeatureDto): Promise<{
        isSuccess: boolean;
        result: Features[];
    }>;
    getAllFeatures(): Promise<{
        isSuccess: boolean;
        result: Features[];
    }>;
    getFeatureById(featureId: string): Promise<{
        isSuccess: boolean;
        result: Features[];
    }>;
    updateFeature(featureId: string, featureData: UpdateFeatureDto): Promise<{
        isSuccess: boolean;
        result: Features[];
    }>;
    removeFeature(featureId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
