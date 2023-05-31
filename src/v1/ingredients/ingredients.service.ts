import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ingredients } from './interface/ingredient.interface';
import { CommonService } from 'src/common/common.service';
import { CreateSubIngredientDto } from './dto/create-SubIngredient.dto';
import { SubIngredient } from './interface/subIngredient.interface';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient') private ingredientModel: Model<Ingredients>,
    private readonly commonService: CommonService,
  ) {}


  async createIngredient(ingredientData: CreateIngredientDto): Promise<{ isSuccess: boolean; result: Ingredients }> {
    // console.log(ingredientData);
    try {
      const { subIngredients, ...ingredientFields } = ingredientData;
      //console.log(subIngredients)
      const newIngredient = new this.ingredientModel(ingredientFields);
      const ingredient = await newIngredient.save();
      // console.log(ingredient);

      if (subIngredients && subIngredients.length > 0) {
        const subIngredientsList: SubIngredient[] = [];

        for (const subIngredientData of subIngredients) {
          if (subIngredientData.title) {
            const subIngredient:SubIngredient = {
              title: subIngredientData.title,
            };
            const createdSubIngredient = new this.ingredientModel(subIngredient); 
            const savedSubIngredient = await createdSubIngredient.save(); 
            console.log(savedSubIngredient);
            subIngredientsList.push(savedSubIngredient._id); 
            //subIngredientsList.push(subIngredient);
          }
        }
        console.log(subIngredientsList);

        ingredient.subIngredients = subIngredientsList;
        await ingredient.save();
      }
      return this.commonService.generateSuccessResponse<Ingredients>(ingredient);
    } catch (error) {
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

  async updateIngredient(ingredientId: string, ingredientData: UpdateIngredientDto): Promise<{ isSuccess: boolean; result: Ingredients }> {
    try {
      const { subIngredients, ...ingredientFields } = ingredientData;
      console.log(subIngredients);
  
      const updatedIngredient = await this.ingredientModel
        .findByIdAndUpdate(
          ingredientId,
          {
            ...ingredientFields,
            dailyValue: {
              ...ingredientFields.dailyValue,
            },
            slug: this.commonService.getSlug(ingredientFields.title),
          },
          { new: true }
        )
        .exec();
        console.log(updatedIngredient);
  
      if (updatedIngredient) {
        // Update subIngredients
        if (subIngredients && subIngredients.length > 0) {
          const subIngredientsList: SubIngredient[] = [];
  
          for (const subIngredientData of subIngredients) {
            console.log(subIngredientData);
            if (subIngredientData.title) {
              const subIngredient: SubIngredient = {
                title: subIngredientData.title,
              };
              const createdSubIngredient = new this.ingredientModel(subIngredient);
              const savedSubIngredient = await createdSubIngredient.save();
              subIngredientsList.push(savedSubIngredient._id);
            }
          }
  
          updatedIngredient.subIngredients = subIngredientsList;
          await updatedIngredient.save();
        } else {
          updatedIngredient.subIngredients = [];
          await updatedIngredient.save();
        }
          return this.commonService.generateSuccessResponse<Ingredients>(updatedIngredient);
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
