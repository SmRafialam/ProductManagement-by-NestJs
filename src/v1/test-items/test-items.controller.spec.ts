import { Test, TestingModule } from '@nestjs/testing';
import { TestItemsController } from './test-items.controller';
import { TestItemsService } from './test-items.service';

describe('TestItemsController', () => {
  let controller: TestItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestItemsController],
      providers: [TestItemsService],
    }).compile();

    controller = module.get<TestItemsController>(TestItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
