import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const errorObj = {
            isSuccess: false,
            error: {
                statusCode: status,
                message: exception.message
            }
        };
        response.status(status).json(errorObj);

        /*
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const errorRes = this.errorFilter(exception)
        let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string|object = 'Something went wrong'
        let error: string|object = 'Internal server error'
        let isSuccess: boolean = false;
        if(errorRes instanceof HttpException) {
            statusCode = errorRes.getStatus() || statusCode
            message = errorRes.getResponse() || message
            error = message
        }else if(errorRes instanceof mongoose.Error.CastError || errorRes instanceof mongoose.Error.ValidationError) {
            statusCode = HttpStatus.BAD_REQUEST
            message = 'Bad request'
            error = message
        }else if(errorRes['code'] && errorRes['code'] === 11000) {
            statusCode = HttpStatus.CONFLICT
            message = 'Resource already exist'
            error = 'Conflict error'
        }else {
            statusCode = errorRes?.statusCode || statusCode
            message = errorRes?.message || message
            error = errorRes?.error || error
        }

        response
        .status(statusCode)
        .json({statusCode, message, error, isSuccess})
        */
    }

    /*private errorFilter(obj: HttpException) {
        const errorRes = obj.getResponse()
        if(errorRes instanceof HttpException && typeof errorRes === 'object'){
            return typeof errorRes.getResponse() === 'object' ? this.errorFilter(errorRes) : errorRes
        }
        return errorRes
    }*/

    private errorFilter(obj: string | object | HttpException) {
        if(obj instanceof HttpException && typeof obj === 'object'){
            const res = obj.getResponse()
            return typeof res === 'object' ? this.errorFilter(res) : obj
        }
        return obj
    }
}