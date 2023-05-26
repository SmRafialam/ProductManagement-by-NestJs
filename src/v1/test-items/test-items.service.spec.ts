import { Test, TestingModule } from '@nestjs/testing';
import { TestItemsService } from './test-items.service';

describe('TestItemsService', () => {
  let service: TestItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestItemsService],
    }).compile();

    service = module.get<TestItemsService>(TestItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
