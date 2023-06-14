import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Controller()
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.createFeature(createFeatureDto);
  }

  @Get()
  findAll() {
    return this.featuresService.getAllFeatures();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuresService.getFeatureById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featuresService.updateFeature(id, updateFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featuresService.removeFeature(id);
  }
}
