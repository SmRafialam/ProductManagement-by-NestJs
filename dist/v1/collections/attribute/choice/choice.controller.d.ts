import { ChoiceService } from './choice.service';
import { ChoiceDto, ChoiceUpdateDto } from './dto';
export declare class ChoiceController {
    private readonly choiceService;
    constructor(choiceService: ChoiceService);
    getChoiceList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Choice[];
    }>;
    addChoice(choiceCreateDto: ChoiceDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Choice[];
    }>;
    updateChoice(choiceId: string, choiceUpdateDto: ChoiceUpdateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Choice[];
    }>;
    deleteChoice(choiceId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
