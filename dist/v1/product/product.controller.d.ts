import { ProductDto } from './dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Product[];
    }>;
    addProduct(productCreateDto: ProductDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Product[];
    }>;
    getProductById(productId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Product[];
    }>;
    updateProduct(productId: string, productUpdateDto: ProductDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Product[];
    }>;
    deleteProduct(productId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
