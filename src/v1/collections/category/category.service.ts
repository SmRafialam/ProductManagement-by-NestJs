import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';
import { Category } from './interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category') private categoryModel: Model<Category>,
        private readonly commonService: CommonService
    ) {}

    async addCategory(categoryData: CategoryCreateDto, parentId?: string, list=[]): Promise<{isSuccess: boolean, result: Category[]}> {
        try {
            const {subCategories, ...saveData} = categoryData;
            if(saveData.hasOwnProperty('parent') && saveData.parent == '') {
                delete saveData.parent;
            }
            const newCategory = new this.categoryModel({
                ...saveData,
                slug: this.commonService.getSlug(saveData.name),
                parent: parentId && parentId !== '' ? parentId : null
            });
            const category = await newCategory.save();
            list.push({
                id: category.id,
                name: category.name,
                slug: category.slug,
                parent: category.parent,
                shortText: category.shortText,
                longText: category.longText,
                media: category.media,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt, 
            });
            if(subCategories !== undefined && subCategories.length) {
                for await (const subCategory of subCategories) {
                    await this.addCategory(subCategory, category.id.toString(), list);
                }
            }
            return this.commonService.generateSuccessResponse<Category[]>(list);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getCategoryList(): Promise<{isSuccess: boolean, result: Category[]}> {
        try {
            const categories = await this.categoryModel.find().sort({name:1}).exec();
            const returnData = categories.map(category=>({
                id: category.id,
                name: category.name,
                slug: category.slug,
                parent: category.parent,
                shortText: category.shortText,
                longText: category.longText,
                media: category.media,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            })) as Category[];

            return this.commonService.generateSuccessResponse<Category[]>(returnData);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getCategoryById(catId: string): Promise<{isSuccess: boolean, result: Category[]}> {
        try {
            const category = await this.categoryModel.findById(catId).exec();
            if(category != null) {
                const returnData = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parent: category.parent,
                    shortText: category.shortText,
                    longText: category.longText,
                    media: category.media,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                } as Category;
                return this.commonService.generateSuccessResponse<Category[]>([returnData]);
            }
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async updateCategory(catId: string, categoryData: CategoryUpdateDto): Promise<{isSuccess: boolean, result: Category[]}> {
        try {
            const category = await this.categoryModel.findByIdAndUpdate(catId, {
                ...categoryData,
                slug: this.commonService.getSlug(categoryData.name),
            }, {new: true}).exec();
            if(category != null) {
                const returnData = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parent: category.parent,
                    shortText: category.shortText,
                    longText: category.longText,
                    media: category.media,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                } as Category;
                return this.commonService.generateSuccessResponse<Category[]>([returnData]);
            }
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async deleteCategory(catId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const category = await this.categoryModel.findByIdAndDelete(catId).exec();
            if(category != null) {
                await this.categoryModel.updateMany({parent: category.id}, {$set: {parent: null}});
                const res = {
                    message: `${category.name} category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getCategoryOrNull(catId: string): Promise<Category> {
        try {
            const category = await this.categoryModel.findById(catId).exec();
            if(category != null) {
                const returnData = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parent: category.parent,
                    shortText: category.shortText,
                    longText: category.longText,
                    media: category.media,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                };
                return returnData as Category;
            }
            return null;
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }
}
