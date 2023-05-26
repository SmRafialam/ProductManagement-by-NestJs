import { MediaExtensionDto } from "./media-extension.dto";
import { MediaQuantityDto } from "./media-quantity.dto";
import { MediaSizeLimitDto } from "./media-size-limit.dto";
export declare class MediaUpdateDto {
    name: string;
    description: string;
    extensions: MediaExtensionDto;
    sizeLimit: MediaSizeLimitDto;
    quantity: MediaQuantityDto;
}
