import { SegmentRole } from "./segment-role.type"

export type ProductRole = {
    view: boolean
    create: boolean
    manageCollaborators: boolean
    publishUnpublish: boolean
    archiveDelete: boolean
    segments: SegmentRole
}