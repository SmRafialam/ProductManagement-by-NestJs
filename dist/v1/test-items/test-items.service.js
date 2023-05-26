"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestItemsService = void 0;
const common_1 = require("@nestjs/common");
let TestItemsService = class TestItemsService {
    create(createTestItemDto) {
        return 'This action adds a new testItem';
    }
    findAll() {
        return `This action returns all testItems`;
    }
    findOne(id) {
        return `This action returns a #${id} testItem`;
    }
    update(id, updateTestItemDto) {
        return `This action updates a #${id} testItem`;
    }
    remove(id) {
        return `This action removes a #${id} testItem`;
    }
};
TestItemsService = __decorate([
    (0, common_1.Injectable)()
], TestItemsService);
exports.TestItemsService = TestItemsService;
//# sourceMappingURL=test-items.service.js.map