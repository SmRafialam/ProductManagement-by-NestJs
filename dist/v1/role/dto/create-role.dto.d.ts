import { CollectionDto } from "./collection.dto";
import { ProductDto } from "./product.dto";
export declare class CreateRoleDto {
    name: string;
    systemAdmin: boolean;
    dashboard: string;
    products: ProductDto;
    collections: CollectionDto;
    priceList: boolean;
}
