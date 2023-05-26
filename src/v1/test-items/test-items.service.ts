import { Injectable } from '@nestjs/common';
import { CreateTestItemDto } from './dto/create-test-item.dto';
import { UpdateTestItemDto } from './dto/update-test-item.dto';

@Injectable()
export class TestItemsService {
  create(createTestItemDto: CreateTestItemDto) {
    return 'This action adds a new testItem';
  }

  findAll() {
    return `This action returns all testItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testItem`;
  }

  update(id: number, updateTestItemDto: UpdateTestItemDto) {
    return `This action updates a #${id} testItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} testItem`;
  }
}
