import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AttributeService } from "../attribute.service";

@Injectable()
export class DeleteAttributeMiddleware implements NestMiddleware {
    constructor(private readonly attributeService: AttributeService ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const attrId = req.params.id;
        const forceDelete = req.query.forceDelete && req.query.forceDelete === 'true' ? true : false;
        const { isSuccess, result } = await this.attributeService.getAttributeById(attrId);
        const attribute = result[0];
        if(Array.isArray(attribute.choices) && attribute.choices.length && !forceDelete) {
            throw new HttpException(
                "The attribute could not be removed because some choices have been assigned to this attribute",
                HttpStatus.BAD_REQUEST
            );
        }
        next();
    }
}