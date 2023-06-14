import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Features } from './interface/features.interface';
import { CommonService } from 'src/common/common.service';
 
@Injectable()
export class FeaturesService {

  constructor(
    @InjectModel('Feature') private featureModel: Model<Features>,
    private readonly commonService: CommonService,
  ) {}

  async createFeature(featureData: CreateFeatureDto):Promise<{ isSuccess: boolean; result: Features[] }> {
    try {
      const { title, image, icon, description } = featureData;
      const newFeature = new this.featureModel({
        title,
        image,
        icon,
        description,
      });
      const feature = await newFeature.save();

      const returnData = {
        id: feature.id,
        title: feature.title,
        image: feature.image,
        icon: feature.icon,
        description: feature.description,
      } as Features;

      return this.commonService.generateSuccessResponse<Features[]>([returnData]);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async getAllFeatures():Promise<{ isSuccess: boolean; result: Features[] }> {
    try {
      const features = await this.featureModel.find().exec();

      const returnData = features.map((feature) => ({
        id: feature.id,
        title: feature.title,
        image: feature.image,
        icon: feature.icon,
        description: feature.description,
      })) as Features[];

      return this.commonService.generateSuccessResponse<Features[]>(returnData);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async getFeatureById(featureId: string):Promise<{ isSuccess: boolean; result: Features[] }> {
    try {
      const feature = await this.featureModel.findById(featureId).exec();
      if (feature !== null) {
        const returnData = {
          id: feature.id,
          title: feature.title,
          image: feature.image,
          icon: feature.icon,
          description: feature.description,
        } as Features;

        return this.commonService.generateSuccessResponse<Features[]>([returnData]);
      }
      throw new HttpException('Feature not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async updateFeature( featureId: string, featureData: UpdateFeatureDto): Promise<{ isSuccess: boolean; result: Features[] }> {
    try {
      const feature = await this.featureModel.findByIdAndUpdate(
        featureId,
        {
          ...featureData,
        },
        { new: true },
      ).exec();
      if (feature !== null) {
        const returnData = {
          id: feature.id,
          title: feature.title,
          image: feature.image,
          icon: feature.icon,
          description: feature.description,
        } as Features;

        return this.commonService.generateSuccessResponse<Features[]>([returnData]);
      }
      throw new HttpException('Feature not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async removeFeature(featureId: string): Promise<{ isSuccess: boolean; result: { message: string }[] }> {
    try {
      const feature = await this.featureModel.findByIdAndDelete(featureId).exec();

      if (feature != null) {
        const res = {
          message: `Feature with ID ${feature.id} has been deleted successfully`,
        };
        return this.commonService.generateSuccessResponse<{ message: string }[]>([res]);
      }
  
      throw new HttpException('Feature not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.commonService.errorHandler(error);
    }  }
}
