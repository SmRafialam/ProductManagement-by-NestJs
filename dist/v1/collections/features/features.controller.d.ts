import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
export declare class FeaturesController {
    private readonly featuresService;
    constructor(featuresService: FeaturesService);
    create(createFeatureDto: CreateFeatureDto): Promise<{
        isSuccess: boolean;
        result: import("./interface/features.interface").Features[];
    }>;
    findAll(): Promise<{
        isSuccess: boolean;
        result: import("./interface/features.interface").Features[];
    }>;
    findOne(id: string): Promise<{
        isSuccess: boolean;
        result: import("./interface/features.interface").Features[];
    }>;
    update(id: string, updateFeatureDto: UpdateFeatureDto): Promise<{
        isSuccess: boolean;
        result: import("./interface/features.interface").Features[];
    }>;
    remove(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
