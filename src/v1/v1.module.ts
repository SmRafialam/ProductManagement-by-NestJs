import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { V1Controller } from "./v1.controller";
import { RoleModule } from './role/role.module';
import { TeamModule } from './team/team.module';
import { CollectionsModule } from './collections/collections.module';
import { ProductModule } from './product/product.module';
import { UploaderModule } from './uploader/uploader.module';
import { AttributeModule } from "./collections/attribute/attribute.module";
import { MailModule } from "src/mail/mail.module";
import { TestItemsModule } from './test-items/test-items.module';
import { IngredientsModule } from './collections/ingredients/ingredients.module';
import { FeaturesModule } from './collections/features/features.module';

@Module({
    imports: [AuthModule, MailModule, UserModule, RoleModule, TeamModule, CollectionsModule, ProductModule, UploaderModule, AttributeModule, TestItemsModule, IngredientsModule, FeaturesModule],
    controllers: [V1Controller]
})
export class V1Module {}