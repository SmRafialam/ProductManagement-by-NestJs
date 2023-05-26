import { SellingChannelDto } from './dto';
import { SellingChannelService } from './selling-channel.service';
export declare class SellingChannelController {
    private readonly sellingChannelService;
    constructor(sellingChannelService: SellingChannelService);
    getSellingChannelList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").SellingChannel[];
    }>;
    addSellingChannel(sellingChannelCreateDto: SellingChannelDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").SellingChannel[];
    }>;
    getSellingChannelById(channelId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").SellingChannel[];
    }>;
    updateSellingChannel(channelId: string, sellingChannelUpdateDto: SellingChannelDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").SellingChannel[];
    }>;
    deleteSellingChannel(channelId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
