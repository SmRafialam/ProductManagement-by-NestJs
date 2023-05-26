import { TagDto } from './dto';
import { TagService } from './tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    getTagList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Tag[];
    }>;
    addTag(tagData: TagDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Tag[];
    }>;
    getTagById(tagId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Tag[];
    }>;
    updateTag(tagId: string, tagData: TagDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Tag[];
    }>;
    deleteTag(tagId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
