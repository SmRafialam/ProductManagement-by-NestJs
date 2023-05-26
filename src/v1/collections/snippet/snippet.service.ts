import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { SnippetCategoryDto, SnippetCreateDto, SnippetUpdateDto } from './dto';
import { Snippet, SnippetCategory } from './interface';

@Injectable()
export class SnippetService {
    constructor(
        @InjectModel('Snippet_Category') private snippetCategoryModel: Model<SnippetCategory>,
        @InjectModel('Snippet') private snippetModel: Model<Snippet>,
        private readonly commonService: CommonService
    ) {}

    async getCategoryList(): Promise<{isSuccess: boolean, result: SnippetCategory[]}> {
        try {
            const snippetList = await this.snippetCategoryModel.find().sort({name: 1}).populate('snippets').exec();
            const returnData = snippetList.map(snippet=>({
                id: snippet.id,
                name: snippet.name,
                snippets: snippet.snippets.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    snippetId: item.snippetId,
                    category: item.category,
                    text: item.text,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                })),
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            })) as SnippetCategory[];
            return this.commonService.generateSuccessResponse<SnippetCategory[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async addCategory(data: SnippetCategoryDto): Promise<{isSuccess: boolean, result: SnippetCategory[]}> {
        try {
            const newCat = new this.snippetCategoryModel({
                ...data
            })
            const snippet = await newCat.save()
            const returnData = {
                id: snippet.id,
                name: snippet.name,
                snippets: snippet.snippets,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            } as SnippetCategory;
            return this.commonService.generateSuccessResponse<SnippetCategory[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async updateCategory(id: string, updateData: SnippetCategoryDto): Promise<{isSuccess: boolean, result: SnippetCategory[]}> {
        try {
            const snippet = await this.snippetCategoryModel.findByIdAndUpdate(id, {
                ...updateData
            }, {new: true}).exec();
            if(snippet != null) {
                const returnData = {
                    id: snippet.id,
                    name: snippet.name,
                    snippets: snippet.snippets,
                    createdAt: snippet.createdAt,
                    updatedAt: snippet.updatedAt
                } as SnippetCategory;
                return this.commonService.generateSuccessResponse<SnippetCategory[]>([returnData]);
            }
            throw new HttpException('Snippet category not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async deleteCategory(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const snippet = await this.snippetCategoryModel.findByIdAndDelete(id).exec()
            if(snippet != null) {
                const res = {
                    message: `${snippet.name} snippet category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Snippet category not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }


    async getSnippetList(): Promise<{isSuccess: boolean, result: Snippet[]}> {
        try {
            const snippetList = await this.snippetModel.find().sort({name: 1}).exec();
            const returnData = snippetList.map(snippet=>({
                id: snippet.id,
                name: snippet.name,
                snippetId: snippet.snippetId,
                category: snippet.category,
                text: snippet.text,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            })) as Snippet[];
            return this.commonService.generateSuccessResponse<Snippet[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async addSnippet(data: SnippetCreateDto): Promise<{isSuccess: boolean, result: Snippet[]}> {
        try {
            const newSnippet = new this.snippetModel({
                ...data
            })
            const snippet = await newSnippet.save()
            await this.snippetCategoryModel.updateOne({'_id': data.category}, {$push: {snippets: snippet.id}})
            const returnData = {
                id: snippet.id,
                name: snippet.name,
                snippetId: snippet.snippetId,
                category: snippet.category,
                text: snippet.text,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            } as Snippet;
            return this.commonService.generateSuccessResponse<Snippet[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async updateSnippet(id: string, updateData: SnippetUpdateDto): Promise<{isSuccess: boolean, result: Snippet[]}> {
        try {
            const item = await this.snippetModel.findById(id).exec();
            const prevCatId = item.category.toString();
            if(item != null) {
                const snippet = await this.snippetModel.findByIdAndUpdate(id, {
                    ...updateData
                }, {new: true}).exec();
                const newCatId = snippet.category.toString();
                if(prevCatId !== newCatId) {
                    await this.snippetCategoryModel.updateOne({'_id': prevCatId}, {$pull: {snippets: snippet.id}})
                    await this.snippetCategoryModel.updateOne({'_id': newCatId}, {$push: {snippets: snippet.id}})
                }
                const returnData = {
                    id: snippet.id,
                    name: snippet.name,
                    snippetId: snippet.snippetId,
                    category: snippet.category,
                    text: snippet.text,
                    createdAt: snippet.createdAt,
                    updatedAt: snippet.updatedAt
                } as Snippet;
                return this.commonService.generateSuccessResponse<Snippet[]>([returnData]);
            }
            throw new HttpException('Snippet text not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async deleteSnippet(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const snippet = await this.snippetModel.findByIdAndDelete(id).exec();
            if(snippet != null) {
                await this.snippetCategoryModel.updateOne({'_id': snippet.category}, {$pull: {snippets: snippet.id}});
                const res = {
                    message: `${snippet.name} has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Snippet text not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }
    
}
