import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { SellingChannelDto } from './dto';
import { SellingChannel } from './interface';
export declare class SellingChannelService {
    private sellingChannelModel;
    private readonly commonService;
    constructor(sellingChannelModel: Model<SellingChannel>, commonService: CommonService);
    getSellingChannelList(): Promise<{
        isSuccess: boolean;
        result: SellingChannel[];
    }>;
    addSellingChannel(data: SellingChannelDto): Promise<{
        isSuccess: boolean;
        result: SellingChannel[];
    }>;
    getSellingChannelById(id: string): Promise<{
        isSuccess: boolean;
        result: SellingChannel[];
    }>;
    updateSellingChannel(id: string, updateData: SellingChannelDto): Promise<{
        isSuccess: boolean;
        result: SellingChannel[];
    }>;
    deleteSellingChannel(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
