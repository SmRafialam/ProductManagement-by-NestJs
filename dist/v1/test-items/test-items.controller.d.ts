import { TestItemsService } from './test-items.service';
import { CreateTestItemDto } from './dto/create-test-item.dto';
import { UpdateTestItemDto } from './dto/update-test-item.dto';
export declare class TestItemsController {
    private readonly testItemsService;
    constructor(testItemsService: TestItemsService);
    create(createTestItemDto: CreateTestItemDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTestItemDto: UpdateTestItemDto): string;
    remove(id: string): string;
}
