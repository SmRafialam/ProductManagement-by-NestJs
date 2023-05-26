import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../category.service";
export declare class CreateCategoryMiddleware implements NestMiddleware {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
