import { MediaExtensionDto } from "./media-extension.dto";
import { MediaQuantityDto } from "./media-quantity.dto";
import { MediaSizeLimitDto } from "./media-size-limit.dto";
export declare class MediaCreateDto {
    name: string;
    description: string;
    category: string;
    extensions: MediaExtensionDto;
    sizeLimit: MediaSizeLimitDto;
    quantity: MediaQuantityDto;
}
