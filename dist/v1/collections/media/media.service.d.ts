import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { MediaCategoryDto, MediaCreateDto, MediaUpdateDto } from './dto';
import { Media, MediaCategory } from './interface';
export declare class MediaService {
    private readonly mediaCategoryModel;
    private readonly mediaModel;
    private readonly commonService;
    constructor(mediaCategoryModel: Model<MediaCategory>, mediaModel: Model<Media>, commonService: CommonService);
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: MediaCategory[];
    }>;
    addMediaCategory(data: MediaCategoryDto): Promise<{
        isSuccess: boolean;
        result: MediaCategory[];
    }>;
    editMediaCategory(mediaCatId: string, updateData: MediaCategoryDto): Promise<{
        isSuccess: boolean;
        result: MediaCategory[];
    }>;
    deleteMediaCategory(mediaCatId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getMediaList(): Promise<{
        isSuccess: boolean;
        result: Media[];
    }>;
    addMedia(data: MediaCreateDto): Promise<{
        isSuccess: boolean;
        result: Media[];
    }>;
    editMedia(mediaId: string, updateData: MediaUpdateDto): Promise<{
        isSuccess: boolean;
        result: Media[];
    }>;
    deleteMedia(mediaId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
