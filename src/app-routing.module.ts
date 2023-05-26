import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { AuthModule } from "./v1/auth/auth.module";
import { AttributeModule } from "./v1/collections/attribute/attribute.module";
import { ChoiceModule } from "./v1/collections/attribute/choice/choice.module";
import { CategoryModule } from "./v1/collections/category/category.module";
import { CollectionsModule } from "./v1/collections/collections.module";
import { FaqModule } from "./v1/collections/faq/faq.module";
import { MediaModule } from "./v1/collections/media/media.module";
import { ReviewModule } from "./v1/collections/review/review.module";
import { SellingChannelModule } from "./v1/collections/selling-channel/selling-channel.module";
import { SnippetModule } from "./v1/collections/snippet/snippet.module";
import { TagModule } from "./v1/collections/tag/tag.module";
import { ProductModule } from "./v1/product/product.module";
import { RoleModule } from "./v1/role/role.module";
import { TeamModule } from "./v1/team/team.module";
import { UploaderModule } from "./v1/uploader/uploader.module";
import { UserModule } from "./v1/user/user.module";
import { V1Module } from "./v1/v1.module";
import { IngredientsModule } from "./v1/ingredients/ingredients.module";

const routes: Routes = [
    {path: 'api/v1', module: V1Module, children: [
        {path: 'auth', module: AuthModule},
        {path: 'user', module: UserModule},
        {path: 'role', module: RoleModule},
        {path: 'team', module: TeamModule},
        {path: 'product', module: ProductModule},
        {path: 'file', module: UploaderModule},
        {path: 'collections', module: CollectionsModule, children: [
            {path: 'category', module: CategoryModule},
            {path: 'tag', module: TagModule},
            {path: 'faq', module: FaqModule},
            {path: 'media', module: MediaModule},
            {path: 'ingredients', module: IngredientsModule},
            {path: 'review', module: ReviewModule},
            {path: 'snippet', module: SnippetModule},
            {path: 'selling-channel', module: SellingChannelModule},
            {path: 'attribute', module: AttributeModule},
            {path: 'choice', module: ChoiceModule},
        ]}
    ]}
]

@Module({
    imports: [RouterModule.register(routes), V1Module]
})
export class AppRoutingModule {}