import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { TagDto } from './dto';
import { Tag } from './interface';
export declare class TagService {
    private tagModel;
    private readonly commonService;
    constructor(tagModel: Model<Tag>, commonService: CommonService);
    getTagList(): Promise<{
        isSuccess: boolean;
        result: Tag[];
    }>;
    addTag(data: TagDto): Promise<{
        isSuccess: boolean;
        result: Tag[];
    }>;
    getTagById(id: string): Promise<{
        isSuccess: boolean;
        result: Tag[];
    }>;
    updateTag(id: string, updateData: TagDto): Promise<{
        isSuccess: boolean;
        result: Tag[];
    }>;
    deleteTag(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
