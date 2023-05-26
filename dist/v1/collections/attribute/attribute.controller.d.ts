import { AttributeService } from './attribute.service';
import { AttributeDto, AttributeUpdateDto } from './dto';
export declare class AttributeController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    getAttributeList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Attribute[];
    }>;
    addAttribute(attributeDto: AttributeDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Attribute[];
    }>;
    getAttributeById(attrId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Attribute[];
    }>;
    updateAttribute(attrId: string, attributeUpdateDto: AttributeUpdateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Attribute[];
    }>;
    deleteAttribute(attrId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
