import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Review } from '../collections/review/interface';
import { ProductDto } from './dto';
import { Product } from './interface';
export declare class ProductService {
    private productModel;
    private reviewModel;
    private readonly commonService;
    constructor(productModel: Model<Product>, reviewModel: Model<Review>, commonService: CommonService);
    getProductList(): Promise<{
        isSuccess: boolean;
        result: Product[];
    }>;
    addProduct(data: ProductDto): Promise<{
        isSuccess: boolean;
        result: Product[];
    }>;
    getProductById(id: string): Promise<{
        isSuccess: boolean;
        result: Product[];
    }>;
    updateProduct(id: string, updateData: ProductDto): Promise<{
        isSuccess: boolean;
        result: Product[];
    }>;
    deleteProduct(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
