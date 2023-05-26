import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AttributeService } from "../attribute.service";
export declare class DeleteAttributeMiddleware implements NestMiddleware {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
