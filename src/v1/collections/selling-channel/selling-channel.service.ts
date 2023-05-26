import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { SellingChannelDto } from './dto';
import { SellingChannel } from './interface';

@Injectable()
export class SellingChannelService {
    constructor(
        @InjectModel('Selling_Channel') private sellingChannelModel: Model<SellingChannel>,
        private readonly commonService: CommonService
    ) {}

    async getSellingChannelList(): Promise<{isSuccess: boolean, result: SellingChannel[]}> {
        try {
            const sellingChannels = await this.sellingChannelModel.find().sort({name: 1}).exec()
            const returnData = sellingChannels.map(sellingChannel=> ({
                id: sellingChannel.id,
                name: sellingChannel.name,
                destination: sellingChannel.destination,
                country: sellingChannel.country,
                priceList: sellingChannel.priceList,
                screens: sellingChannel.screens,
                createdAt: sellingChannel.createdAt,
                updatedAt: sellingChannel.updatedAt
            })) as SellingChannel[];
            return this.commonService.generateSuccessResponse<SellingChannel[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error?.status)
        }

    }

    async addSellingChannel(data: SellingChannelDto): Promise<{isSuccess: boolean, result: SellingChannel[]}> {
        try {
            const newSellingChannel = new this.sellingChannelModel({
                ...data
            });
            const sellingChannel = await newSellingChannel.save();
            const returnData = {
                id: sellingChannel.id,
                name: sellingChannel.name,
                destination: sellingChannel.destination,
                country: sellingChannel.country,
                priceList: sellingChannel.priceList,
                screens: sellingChannel.screens,
                createdAt: sellingChannel.createdAt,
                updatedAt: sellingChannel.updatedAt
            } as SellingChannel;
            return this.commonService.generateSuccessResponse<SellingChannel[]>([returnData]);
        }catch(error){
            throw new HttpException(error, error?.status)
        }
    }

    async getSellingChannelById(id: string): Promise<{isSuccess: boolean, result: SellingChannel[]}> {
        try {
            const sellingChannel = await this.sellingChannelModel.findById(id).exec()
            if(sellingChannel != null) {
                const returnData = {
                    id: sellingChannel.id,
                    name: sellingChannel.name,
                    destination: sellingChannel.destination,
                    country: sellingChannel.country,
                    priceList: sellingChannel.priceList,
                    screens: sellingChannel.screens,
                    createdAt: sellingChannel.createdAt,
                    updatedAt: sellingChannel.updatedAt
                } as SellingChannel;
                return this.commonService.generateSuccessResponse<SellingChannel[]>([returnData]);
            }
            throw new HttpException('Selling channel not found', HttpStatus.NOT_FOUND)
        }catch(error){
            throw new HttpException(error, error?.status)
        }
    }

    async updateSellingChannel(id: string, updateData: SellingChannelDto): Promise<{isSuccess: boolean, result: SellingChannel[]}> {
        try {
            const sellingChannel = await this.sellingChannelModel.findByIdAndUpdate(id, {
                ...updateData
            }, {new: true}).exec();
            if(sellingChannel != null) {
                const returnData = {
                    id: sellingChannel.id,
                    name: sellingChannel.name,
                    destination: sellingChannel.destination,
                    country: sellingChannel.country,
                    priceList: sellingChannel.priceList,
                    screens: sellingChannel.screens,
                    createdAt: sellingChannel.createdAt,
                    updatedAt: sellingChannel.updatedAt
                } as SellingChannel;
                return this.commonService.generateSuccessResponse<SellingChannel[]>([returnData]);
            }
            throw new HttpException('Selling channel not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async deleteSellingChannel(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const sellingChannel = await this.sellingChannelModel.findByIdAndDelete(id).exec();
            if(sellingChannel != null) {
                const res = {
                    message: `${sellingChannel.name} selling channel has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Selling channel not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error?.status);
        }
    }
}
