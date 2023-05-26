import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { snippetCategorySchema, snippetSchema } from './schema';
import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Snippet_Category', schema: snippetCategorySchema},
      {name: 'Snippet', schema: snippetSchema}
    ]),
    CommonModule
  ],
  controllers: [SnippetController],
  providers: [SnippetService]
})
export class SnippetModule {}
