import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { FaqCategoryDto, FaqCreateDto, FaqUpdateDto } from './dto';
import { Faq, FaqCategory } from './interface';

@Injectable()
export class FaqService {
    constructor(
        @InjectModel('Faq_Category') private faqCategoryModel: Model<FaqCategory>,
        @InjectModel('Faq') private faqModel: Model<Faq>,
        private readonly commonService: CommonService
    ) {}

    async getFaqDetail(): Promise<{isSuccess: boolean, result: FaqCategory[]}> {
        try {
            const faqs = await this.faqCategoryModel.find().populate('faqs').sort({name: 1}).exec();
            const returnData = faqs.map(faq=>({
                id  : faq.id,
                name: faq.name,
                note: faq.note,
                faqs: faq.faqs.map((faq: any) =>({
                    id: faq.id,
                    question: faq.question,
                    note: faq.note,
                    answers: faq.answers
                })),
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            })) as FaqCategory[];
            return this.commonService.generateSuccessResponse<FaqCategory[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async getCategoryList(): Promise<{isSuccess: boolean, result: FaqCategory[]}> {
        try {
            const faqs = await this.faqCategoryModel.find().sort({name: 1}).exec();
            const returnData = faqs.map(faq=>({
                id: faq.id,
                name: faq.name,
                note: faq.note,
                faqs: faq.faqs,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            })) as FaqCategory[];
            return this.commonService.generateSuccessResponse<FaqCategory[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async addFaqCategory(data: FaqCategoryDto): Promise<{isSuccess: boolean, result: FaqCategory[]}> {
        try {
            const newFaqCat = new this.faqCategoryModel({
                ...data
            });
            const faq = await newFaqCat.save();
            const returnData = {
                id: faq.id,
                name: faq.name,
                note: faq.note,
                faqs: faq.faqs,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            } as FaqCategory;
            return this.commonService.generateSuccessResponse<FaqCategory[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async editFaqCategory(faqCatId: string, updateData: FaqCategoryDto): Promise<{isSuccess: boolean, result: FaqCategory[]}> {
        try {
            const faq = await this.faqCategoryModel.findByIdAndUpdate(faqCatId, {
                ...updateData
            }, {new: true}).exec();
            if(faq != null) {
                const returnData = {
                    id: faq.id,
                    name: faq.name,
                    note: faq.note,
                    faqs: faq.faqs,
                    createdAt: faq.createdAt,
                    updatedAt: faq.updatedAt
                } as FaqCategory;
                return this.commonService.generateSuccessResponse<FaqCategory[]>([returnData]);
            }
            throw new HttpException('Faq not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async deleteFaqCategory(faqCatId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const faq = await this.faqCategoryModel.findByIdAndDelete(faqCatId).exec()
            if(faq != null) {
                const res = {
                    message: `${faq.name} faq category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Faq not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async getFaqList(): Promise<{isSuccess: boolean, result: Faq[]}> {
        try {
            const faqs = await this.faqModel.find().sort({question: 1}).exec()
            const returnData = faqs.map(faq=>({
                id: faq.id,
                question: faq.question,
                note: faq.note,
                answers: faq.answers,
                category: faq.category,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            })) as Faq[];
            return this.commonService.generateSuccessResponse<Faq[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async addFaq(data: FaqCreateDto): Promise<{isSuccess: boolean, result: Faq[]}> {
        try {
            const newFaq = new this.faqModel({
                ...data
            });
            const faq = await newFaq.save();
            await this.faqCategoryModel.updateOne({'_id': data.category}, {$push: {faqs: faq.id}});
            const returnData = {
                id: faq.id,
                question: faq.question,
                note: faq.note,
                answers: faq.answers,
                category: faq.category,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            } as Faq;
            return this.commonService.generateSuccessResponse<Faq[]>([returnData]);
        }catch(error) {
            throw new HttpException(error, error.status)
        }
    }

    async editFaq(questionId: string, updateData: FaqUpdateDto): Promise<{isSuccess: boolean, result: Faq[]}> {
        try {
            const faq = await this.faqModel.findByIdAndUpdate(questionId, {
                ...updateData
            }, {new: true}).exec();
            if(faq != null) {
                const returnData = {
                    id: faq.id,
                    question: faq.question,
                    note: faq.note,
                    answers: faq.answers,
                    category: faq.category,
                    createdAt: faq.createdAt,
                    updatedAt: faq.updatedAt
                } as Faq;
                return this.commonService.generateSuccessResponse<Faq[]>([returnData]);
            }
            throw new HttpException('Faq not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }

    async deleteFaq(questionId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const faq = await this.faqModel.findByIdAndDelete(questionId).exec();
            if(faq != null) {
                await this.faqCategoryModel.updateOne({'_id': faq.category}, {$pull: {faqs: faq.id}});
                const res = {
                    message: `"${faq.question}" has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Faq not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error.status);
        }
    }
}
