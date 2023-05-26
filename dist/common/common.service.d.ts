export declare class CommonService {
    changeable_ids(newIds: string[], prevIds: string[]): Promise<{
        add: string[];
        remove: string[];
    }>;
    getSlug(name: string): string;
    convertToSeconds: (time: string) => number;
    generateSuccessResponse<T>(result: T): {
        isSuccess: boolean;
        result: T;
    };
    errorHandler(error: unknown): void;
}
