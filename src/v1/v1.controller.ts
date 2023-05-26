import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('v1')
@Controller()
export class V1Controller {
    @Get()
    home() {
        return {
            isSuccess: true,
            message: 'PIM Rest API version 1.0.0'
        };
    }
}