import { SegmentRole } from "./segment-role.type";
export declare type ProductRole = {
    view: boolean;
    create: boolean;
    manageCollaborators: boolean;
    publishUnpublish: boolean;
    archiveDelete: boolean;
    segments: SegmentRole;
};
