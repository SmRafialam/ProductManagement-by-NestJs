"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const slugify_1 = require("slugify");
let CommonService = class CommonService {
    constructor() {
        this.convertToSeconds = (time) => {
            let value = parseInt(time.slice(0, -1));
            let unit = time.slice(-1).toLowerCase();
            switch (unit) {
                case 's':
                    return value;
                case 'm':
                    return value * 60;
                case 'h':
                    return value * 3600;
                case 'd':
                    return value * 86400;
                default:
                    throw new common_1.HttpException(`Invalid time unit: ${unit}`, common_1.HttpStatus.BAD_REQUEST);
            }
        };
    }
    async changeable_ids(newIds, prevIds) {
        const add = newIds.filter(e => !prevIds.includes(e));
        const remove = prevIds.filter(e => !newIds.includes(e));
        return { add, remove };
    }
    getSlug(name) {
        slugify_1.default.extend({ '®': '', '™': '' });
        const filterString = name.replace(/\/\//g, ' ');
        const slug = (0, slugify_1.default)(filterString, {
            lower: true,
            strict: true,
            trim: true,
            remove: /[^a-zA-Z0-9 ]/g
        });
        return slug;
    }
    generateSuccessResponse(result) {
        return {
            isSuccess: true,
            result
        };
    }
    errorHandler(error) {
        if (error instanceof mongoose_1.default.Error)
            throw new common_1.HttpException('bad request', common_1.HttpStatus.BAD_REQUEST);
        if (error instanceof mongodb_1.MongoError) {
            if (error.code == '11000')
                throw new common_1.HttpException('resource already exist', common_1.HttpStatus.CONFLICT);
            throw new common_1.HttpException('something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (error instanceof common_1.HttpException)
            throw new common_1.HttpException(error.message, error.getStatus());
        throw new common_1.HttpException('something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map