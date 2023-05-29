import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredients } from './interface/ingredient.interface';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient') private ingredientModel: Model<Ingredients>,
    private readonly commonService: CommonService,
  ) {}


  async createIngredient(ingredientData: CreateIngredientDto):Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    console.log(ingredientData);
    try{
      const newIngredient = new this.ingredientModel({
      ...ingredientData,
    })

      const ingredient = await newIngredient.save();
      console.log(ingredient);
      const returnData = {
        id: ingredient.id,
        title: ingredient.title,
        dailyValue: ingredient.dailyValue,
        description: ingredient.description,
        showDescription: ingredient.showDescription,
        image: ingredient.image,
        icon: ingredient.icon
     }as Ingredients
     console.log(returnData);
     return this.commonService.generateSuccessResponse<Ingredients[]>([
      returnData,
    ]);    
    }
    catch(error) {
      console.log(error);
      this.commonService.errorHandler(error);
      
    }
  }

  async getIngredientList(): Promise<{ isSuccess: boolean; result: Ingredients[] }>  {
    try {
      const ingredients = await this.ingredientModel.find().exec();

      const returnData = ingredients.map((ingredient) => ({
        id: ingredient.id,
        title: ingredient.title,
        dailyValue: ingredient.dailyValue,
        description: ingredient.description,
        showDescription: ingredient.showDescription,
        image: ingredient.image,
        icon: ingredient.icon,
      })) as Ingredients[];

      return this.commonService.generateSuccessResponse<Ingredients[]>(returnData);
    } catch (error) {
      this.commonService.errorHandler(error);
    }  
  }

  async getIngredientById( ingredientId: string,): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    try {
      const ingredient = await this.ingredientModel.findById(ingredientId).exec();

      if (ingredient != null) {
        const returnData = {
          id: ingredient.id,
          title: ingredient.title,
          dailyValue: ingredient.dailyValue,
          description: ingredient.description,
          showDescription: ingredient.showDescription,
          image: ingredient.image,
          icon: ingredient.icon,
        } as Ingredients;

        return this.commonService.generateSuccessResponse<Ingredients[]>([
          returnData,
        ]);
      }

      throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }


  async updateIngredient( ingredientId: string, ingredientData: UpdateIngredientDto,): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    try {
      const updatedIngredient = await this.ingredientModel
        .findByIdAndUpdate(
          ingredientId,
          {
            ...ingredientData,
            dailyValue: {
              ...ingredientData.dailyValue,
            },
            slug: this.commonService.getSlug(ingredientData.title),
          },
          { new: true }
        )
        .exec();
        console.log(updatedIngredient);

      if (updatedIngredient) {
        const returnData = {
          id: updatedIngredient.id,
          title: updatedIngredient.title,
          dailyValue: updatedIngredient.dailyValue,
          description: updatedIngredient.description,
          showDescription: updatedIngredient.showDescription,
          image: updatedIngredient.image,
          icon: updatedIngredient.icon,
        } as Ingredients;
  
        return this.commonService.generateSuccessResponse<Ingredients[]>([
          returnData,
        ]);
      }
  
      throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(error);
      this.commonService.errorHandler(error);
    }
  }
  


  async deleteIngredient(ingredientId: string,): Promise<{ isSuccess: boolean; result: { message: string }[] }> {
    try {
      const ingredient = await this.ingredientModel.findByIdAndDelete(ingredientId).exec();

      if (ingredient != null) {
        const res = {
          message: `${ingredient.title} ingredient has been deleted successfully`,
        };

        return this.commonService.generateSuccessResponse<{ message: string }[]>([res]);
      }

      throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }
}
