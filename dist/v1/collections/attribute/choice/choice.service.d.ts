import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Attribute } from '../interface';
import { ChoiceDto, ChoiceUpdateDto } from './dto';
import { Choice } from './interface';
export declare class ChoiceService {
    private attributeModel;
    private choiceModel;
    private readonly commonService;
    constructor(attributeModel: Model<Attribute>, choiceModel: Model<Choice>, commonService: CommonService);
    getChoiceList(): Promise<{
        isSuccess: boolean;
        result: Choice[];
    }>;
    addChoice(choiceData: ChoiceDto): Promise<{
        isSuccess: boolean;
        result: Choice[];
    }>;
    updateChoice(choiceId: string, choiceData: ChoiceUpdateDto): Promise<{
        isSuccess: boolean;
        result: Choice[];
    }>;
    deleteChoice(choiceId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
