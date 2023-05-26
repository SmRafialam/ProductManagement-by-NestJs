import { Module } from '@nestjs/common';
import { TestItemsService } from './test-items.service';
import { TestItemsController } from './test-items.controller';

@Module({
  controllers: [TestItemsController],
  providers: [TestItemsService]
})
export class TestItemsModule {}
