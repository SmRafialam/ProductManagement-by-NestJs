import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientDto, DailyValueDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ingredients } from './interface/ingredient.interface';
import { CommonService } from 'src/common/common.service';
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
          console.log(subIngredientData)
          if (subIngredientData.title) {
            const subIngredient:SubIngredient = {
              title: subIngredientData.title,
              isSubIngredient: true,
              parent: ingredient._id,

            };

          const existingSubIngredient = await this.ingredientModel.findOne({ title: subIngredient.title }).exec();
         
            if (existingSubIngredient) {
              if(subIngredient.title === ingredient.title){
                continue; 
              }
              subIngredientsList.push(existingSubIngredient._id);
              console.log('existingSubIngredient',existingSubIngredient);

            } else {
              const createdSubIngredient = new this.ingredientModel(subIngredient);
              const savedSubIngredient = await createdSubIngredient.save();
              subIngredientsList.push(savedSubIngredient._id);
            }
          }
        }
        console.log(subIngredientsList);

        ingredient.subIngredients = subIngredientsList;
        await ingredient.save();
      }
      const populatedIngredient = await this.ingredientModel.findById(ingredient._id).populate('subIngredients');
      return this.commonService.generateSuccessResponse<Ingredients>(populatedIngredient);
    } catch (error) {
      console.log(error);
      this.commonService.errorHandler(error);
    }
  }


  async getIngredientList(): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    try {
      const ingredients = await this.ingredientModel.find().populate('subIngredients').exec();

      const returnData = ingredients.map(ingredient => ({
        id: ingredient.id,
        title: ingredient.title,
        dailyValue: ingredient.dailyValue,
        description: ingredient.description,
        showDescription: ingredient.showDescription,
        image: ingredient.image,
        icon: ingredient.icon,
        subIngredients: ingredient.subIngredients
      })) as Ingredients[];
  
      return this.commonService.generateSuccessResponse<Ingredients[]>(returnData);
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }
  
  
  async getIngredientById( ingredientId: string,): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    try {
      const ingredient = await this.ingredientModel.findById(ingredientId).populate('subIngredients').exec();

      if (ingredient != null) {
        const returnData = {
          id: ingredient.id,
          title: ingredient.title,
          dailyValue: ingredient.dailyValue,
          description: ingredient.description,
          showDescription: ingredient.showDescription,
          image: ingredient.image,
          icon: ingredient.icon,
          subIngredients: ingredient.subIngredients,
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
        ).populate('subIngredients')
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
                isSubIngredient: true,
                parent: updatedIngredient._id,

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

  // async createBulkIngredients(ingredientTitles: string[]): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
  //   try {
  //     const createdIngredients: Ingredients[] = [];
  
  //     for (const title of ingredientTitles) {
  //       // Check if the title has a "-" prefix
  //       if (title.startsWith('-')) {
  //         // Remove the "-" prefix
  //         const subIngredientTitle = title.substring(1).trim();
  
  //         // Check if there is a parent ingredient available
  //         if (createdIngredients.length > 0) {
  //           const parentIngredient = createdIngredients[createdIngredients.length - 1];
  
  //           // Create and add the sub-ingredient to the parent ingredient
  //           const subIngredient = new this.ingredientModel({ title: subIngredientTitle, isSubIngredient: true });
  //           const savedSubIngredient = await subIngredient.save();
  //           parentIngredient.subIngredients.push(savedSubIngredient._id);
  //           console.log(savedSubIngredient);

  //         } else {
  //           // If there is no parent ingredient, ignore the sub-ingredient
  //           console.warn(`Ignoring sub-ingredient "${subIngredientTitle}" as there is no parent ingredient.`);
  //         }
  //       } else {
  //         // Create the main ingredient
  //         const ingredient = new this.ingredientModel({ title });
  //         const savedIngredient = await ingredient.save();
  //          // Populate the sub-ingredients for the main ingredient
  //         const populatedIngredient = await savedIngredient.populate('subIngredients');
  //         createdIngredients.push(populatedIngredient);
  //         console.log(createdIngredients);
  //       }
  //     }
  
  //     return this.commonService.generateSuccessResponse<Ingredients[]>(createdIngredients);
  //   } catch (error) {
  //     console.log(error);
  //     this.commonService.errorHandler(error);
  //   }
  // }

  async createBulkIngredients(ingredientData: { title: string; subIngredients: { title: string; subIngredients: any[] }[] }[]): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    try {
      const createdIngredients: Ingredients[] = [];
  
      const createSubIngredients = async (parent: Ingredients, subIngredients: { title: string; subIngredients: any[] }[]) => {
        for (const subIngredientData of subIngredients) {
          const subIngredient = new this.ingredientModel({ title: subIngredientData.title });
          const savedSubIngredient = await subIngredient.save();
          parent.subIngredients.push(savedSubIngredient.id);
          await createSubIngredients(savedSubIngredient, subIngredientData.subIngredients);
        }
      };
  
      for (const ingredient of ingredientData) {
        const mainIngredient = new this.ingredientModel({ title: ingredient.title });
        await createSubIngredients(mainIngredient, ingredient.subIngredients);
        const savedMainIngredient = await mainIngredient.save();
        createdIngredients.push(savedMainIngredient);
      }
  
      const populatedIngredients = await this.ingredientModel.populate(createdIngredients, { path: 'subIngredients' });
  
      return this.commonService.generateSuccessResponse<Ingredients[]>(populatedIngredients);
    } catch (error) {
      console.log(error);
      this.commonService.errorHandler(error);
    }
  }
  
  
  async createSubIngredients(parentId: string, subIngredients: { title: string; subIngredients: any[]; }[]): Promise<void> {
    for (const subIngredient of subIngredients) {
      const subIngredientDoc = new this.ingredientModel({ title: subIngredient.title });
      console.log("subIng",subIngredientDoc, parentId);
      const savedSubIngredient = await subIngredientDoc.save();
      //console.log(savedSubIngredient)
      if (subIngredient.subIngredients && subIngredient.subIngredients.length > 0) {
        await this.createSubIngredients(savedSubIngredient._id, subIngredient.subIngredients);
      }
    }
  }
  
}