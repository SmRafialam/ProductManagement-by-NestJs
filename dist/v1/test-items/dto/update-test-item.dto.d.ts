import { CreateTestItemDto } from './create-test-item.dto';
declare const UpdateTestItemDto_base: import("@nestjs/common").Type<Partial<CreateTestItemDto>>;
export declare class UpdateTestItemDto extends UpdateTestItemDto_base {
    name: string;
    description: string;
    quantity: string;
}
export {};
