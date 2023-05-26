import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    home() {
        return {
            isSuccess: true,
            message: 'PIM Rest API'
        }
    }
}