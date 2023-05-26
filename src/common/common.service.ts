import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import slugify from "slugify";

@Injectable()
export class CommonService {

    // utilities functions
    async changeable_ids(newIds: string[], prevIds: string[]): Promise<{add: string[], remove: string[]}> {
        const add = newIds.filter(e => !prevIds.includes(e))
        const remove = prevIds.filter(e => !newIds.includes(e))
        return {add, remove}
    }

    getSlug(name: string): string {
        slugify.extend({'®': '', '™': ''})
        const filterString = name.replace(/\/\//g, ' ')
        const slug = slugify(filterString, {
            lower: true,
            strict: true,
            trim: true,
            remove: /[^a-zA-Z0-9 ]/g
        })
        return slug
    }

    convertToSeconds = (time: string) => {
      let value = parseInt(time.slice(0, -1));
      let unit = time.slice(-1).toLowerCase();
      switch (unit) {
        case 's':
          return value;
        case 'm':
          return value * 60;
        case 'h':
          return value * 3600;
        case 'd':
          return value * 86400;
        default:
          throw new HttpException(`Invalid time unit: ${unit}`, HttpStatus.BAD_REQUEST);
      }
    }

    generateSuccessResponse<T>(result: T): {isSuccess: boolean, result: T} {
      return {
        isSuccess: true,
        result
      }
    }

    errorHandler(error: unknown) {
      if(error instanceof mongoose.Error) throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      if(error instanceof MongoError) {
        if(error.code == '11000') throw new HttpException('resource already exist', HttpStatus.CONFLICT);
        throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if(error instanceof HttpException) throw new HttpException(error.message, error.getStatus());
      throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
}