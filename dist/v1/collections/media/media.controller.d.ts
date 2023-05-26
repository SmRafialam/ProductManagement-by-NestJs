import { MediaCategoryDto, MediaCreateDto, MediaUpdateDto } from './dto';
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").MediaCategory[];
    }>;
    addMediaCategory(mediaCatCreateDto: MediaCategoryDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").MediaCategory[];
    }>;
    editMediaCategory(mediaCatId: string, mediaCatUpdateDto: MediaCategoryDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").MediaCategory[];
    }>;
    deleteMediaCategory(mediaCatId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getMediaList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Media[];
    }>;
    addMedia(mediaCreateDto: MediaCreateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Media[];
    }>;
    editMedia(mediaCatId: string, mediaUpdateDto: MediaUpdateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Media[];
    }>;
    deleteMedia(mediaCatId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
