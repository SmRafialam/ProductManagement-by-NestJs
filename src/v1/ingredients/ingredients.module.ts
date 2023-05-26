import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ingredientSchema } from './schema/ingredients.schema';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ingredient', schema: ingredientSchema }])],
  controllers: [IngredientsController],
  providers: [IngredientsService,CommonService]
})
export class IngredientsModule {
  
}
