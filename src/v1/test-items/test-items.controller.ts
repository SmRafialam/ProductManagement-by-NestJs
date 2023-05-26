import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestItemsService } from './test-items.service';
import { CreateTestItemDto } from './dto/create-test-item.dto';
import { UpdateTestItemDto } from './dto/update-test-item.dto';

@Controller('test-items')
export class TestItemsController {
  constructor(private readonly testItemsService: TestItemsService) {}

  @Post()
  create(@Body() createTestItemDto: CreateTestItemDto) {
    return this.testItemsService.create(createTestItemDto);
  }

  @Get()
  findAll() {
    return this.testItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestItemDto: UpdateTestItemDto) {
    return this.testItemsService.update(+id, updateTestItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testItemsService.remove(+id);
  }
}
