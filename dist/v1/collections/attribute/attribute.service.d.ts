import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Choice } from './choice/interface';
import { AttributeDto, AttributeUpdateDto } from './dto';
import { Attribute } from './interface';
export declare class AttributeService {
    private attributeModel;
    private choiceModel;
    private readonly commonService;
    constructor(attributeModel: Model<Attribute>, choiceModel: Model<Choice>, commonService: CommonService);
    addAttribute(attrData: AttributeDto): Promise<{
        isSuccess: boolean;
        result: Attribute[];
    }>;
    getAttributeList(): Promise<{
        isSuccess: boolean;
        result: Attribute[];
    }>;
    getAttributeById(attrId: string): Promise<{
        isSuccess: boolean;
        result: Attribute[];
    }>;
    private addChoice;
    private getUniqueChoices;
    updateAttribute(attrId: string, attrData: AttributeUpdateDto): Promise<{
        isSuccess: boolean;
        result: Attribute[];
    }>;
    deleteAttribute(attrId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
