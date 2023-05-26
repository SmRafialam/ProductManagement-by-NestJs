import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { TagDto } from './dto';
import { Tag } from './interface';

@Injectable()
export class TagService {
    constructor(
        @InjectModel('Tag') private tagModel: Model<Tag>,
        private readonly commonService: CommonService
    ) {}

    async getTagList(): Promise<{isSuccess: boolean, result: Tag[]}> {
        try {
            const tags = await this.tagModel.find().sort({name: 1}).exec()
            const returnData = tags.map(tag=>({
                id: tag.id,
                name: tag.name,
                createdAt: tag.createdAt,
                updatedAt: tag.updatedAt
            })) as Tag[];
            return this.commonService.generateSuccessResponse<Tag[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async addTag(data: TagDto): Promise<{isSuccess: boolean, result: Tag[]}> {
        try {
            const newTag = new this.tagModel({
                ...data
            })
            const tag = await newTag.save()
            const returnData = {
                id: tag.id,
                name: tag.name,
                createdAt: tag.createdAt,
                updatedAt: tag.updatedAt
            } as Tag;
            return this.commonService.generateSuccessResponse<Tag[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async getTagById(id: string): Promise<{isSuccess: boolean, result: Tag[]}> {
        try {
            const tag = await this.tagModel.findById(id).exec();
            if(tag != null) {
                const returnData = {
                    id: tag.id,
                    name: tag.name,
                    createdAt: tag.createdAt,
                    updatedAt: tag.updatedAt
                } as Tag;
                return this.commonService.generateSuccessResponse<Tag[]>([returnData]);
            }
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async updateTag(id: string, updateData: TagDto): Promise<{isSuccess: boolean, result: Tag[]}> {
        try {
            const tag = await this.tagModel.findByIdAndUpdate(id, {
                ...updateData
            }, {new: true}).exec()
            if(tag != null) {
                const returnData = {
                    id: tag.id,
                    name: tag.name,
                    createdAt: tag.createdAt,
                    updatedAt: tag.updatedAt
                } as Tag;
                return this.commonService.generateSuccessResponse<Tag[]>([returnData]);
            }
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async deleteTag(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const tag = await this.tagModel.findByIdAndDelete(id).exec()
            if(tag != null) {
                const res = {
                    message: `${tag.name} tag has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }
}
