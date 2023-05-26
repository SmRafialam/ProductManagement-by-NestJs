import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../category.service";

@Injectable()
export class CreateCategoryMiddleware implements NestMiddleware {

    constructor(private readonly categoryService: CategoryService ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const {parent} = req.body
        if((parent != undefined || parent != null) && parent !== '') {
            const category = await this.categoryService.getCategoryOrNull(parent)
            if(!category) {
                throw new HttpException("Parent category not found", HttpStatus.BAD_REQUEST)
            }
            next()
        }else {
            next()
        }
    }
}