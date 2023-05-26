import { CreateTestItemDto } from './dto/create-test-item.dto';
import { UpdateTestItemDto } from './dto/update-test-item.dto';
export declare class TestItemsService {
    create(createTestItemDto: CreateTestItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTestItemDto: UpdateTestItemDto): string;
    remove(id: number): string;
}
