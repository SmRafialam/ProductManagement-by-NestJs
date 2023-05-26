import { SegmentDto } from "./segment.dto";
export declare class ProductDto {
    view: boolean;
    create: boolean;
    manageCollaborators: boolean;
    publishUnpublish: boolean;
    archiveDelete: boolean;
    segments: SegmentDto;
}
