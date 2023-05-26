import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { MediaCategoryDto, MediaCreateDto, MediaUpdateDto } from './dto';
import { Media, MediaCategory } from './interface';

@Injectable()
export class MediaService {
    constructor(
        @InjectModel('Media_Category') private readonly mediaCategoryModel: Model<MediaCategory>,
        @InjectModel('Media') private readonly mediaModel: Model<Media>,
        private readonly commonService: CommonService
    ) {}

    async getCategoryList(): Promise<{isSuccess: boolean, result: MediaCategory[]}> {
        try {
            const mediaList = await this.mediaCategoryModel.find().sort({name: 1}).populate('media').exec()
            const returnData = mediaList.map(media=>({
                id: media.id,
                name: media.name,
                description: media.description,
                media: media.media.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    extensions: item.extensions,
                    sizeLimit: item.sizeLimit,
                    quantity: item.quantity,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                })),
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            })) as MediaCategory[];
            return this.commonService.generateSuccessResponse<MediaCategory[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async addMediaCategory(data: MediaCategoryDto): Promise<{isSuccess: boolean, result: MediaCategory[]}> {
        try {
            const newMediaCat = new this.mediaCategoryModel({
                ...data
            });
            const media = await newMediaCat.save();
            const returnData = {
                id: media.id,
                name: media.name,
                description: media.description,
                media: media.media,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            } as MediaCategory;
            return this.commonService.generateSuccessResponse<MediaCategory[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async editMediaCategory(mediaCatId: string, updateData: MediaCategoryDto): Promise<{isSuccess: boolean, result: MediaCategory[]}> {
        try {
            const media = await this.mediaCategoryModel.findByIdAndUpdate(mediaCatId, {
                ...updateData
            }, {new: true}).exec();
            if(media != null) {
                const returnData = {
                    id: media.id,
                    name: media.name,
                    description: media.description,
                    media: media.media,
                    createdAt: media.createdAt,
                    updatedAt: media.updatedAt
                } as MediaCategory;
                return this.commonService.generateSuccessResponse<MediaCategory[]>([returnData]);
            }
            throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async deleteMediaCategory(mediaCatId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const media = await this.mediaCategoryModel.findByIdAndDelete(mediaCatId).exec()
            if(media != null) {
                const res = {
                    message: `${media.name} media category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Media not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }


    async getMediaList(): Promise<{isSuccess: boolean, result: Media[]}> {
        try {
            const mediaList = await this.mediaModel.find().sort({name: 1}).exec()
            const returnData = mediaList.map(media=>({
                id: media.id,
                name: media.name,
                description: media.description,
                category: media.category,
                extensions: media.extensions,
                sizeLimit: media.sizeLimit,
                quantity: media.quantity,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            })) as Media[];
            return this.commonService.generateSuccessResponse<Media[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async addMedia(data: MediaCreateDto): Promise<{isSuccess: boolean, result: Media[]}> {
        try {
            const newMedia = new this.mediaModel({
                ...data
            })
            const media = await newMedia.save();
            await this.mediaCategoryModel.updateOne({'_id': data.category}, {$push: {media: media.id}});
            const returnData = {
                id: media.id,
                name: media.name,
                description: media.description,
                category: media.category,
                extensions: media.extensions,
                sizeLimit: media.sizeLimit,
                quantity: media.quantity,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            } as Media;
            return this.commonService.generateSuccessResponse<Media[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async editMedia(mediaId: string, updateData: MediaUpdateDto): Promise<{isSuccess: boolean, result: Media[]}> {
        try {
            const media = await this.mediaModel.findByIdAndUpdate(mediaId, {
                ...updateData
            }, {new: true}).exec();
            if(media != null) {
                const returnData = {
                    id: media.id,
                    name: media.name,
                    description: media.description,
                    category: media.category,
                    extensions: media.extensions,
                    sizeLimit: media.sizeLimit,
                    quantity: media.quantity,
                    createdAt: media.createdAt,
                    updatedAt: media.updatedAt
                } as Media;
                return this.commonService.generateSuccessResponse<Media[]>([returnData]);
            }
            throw new HttpException('Faq not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async deleteMedia(mediaId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const media = await this.mediaModel.findByIdAndDelete(mediaId).exec();
            if(media != null) {
                await this.mediaCategoryModel.updateOne({'_id': media.category}, {$pull: {media: media.id}});
                const res = {
                    message: `${media.name} has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }
    
}
