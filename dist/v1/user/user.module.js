"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const common_module_1 = require("../../common/common.module");
const mail_module_1 = require("../../mail/mail.module");
const token_module_1 = require("../auth/token/token.module");
const schema_1 = require("../role/schema");
const schema_2 = require("../team/schema");
const middleware_1 = require("./middleware");
const schema_3 = require("./schema");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
    configure(consumer) {
        consumer
            .apply(middleware_1.InviteUserMiddleware)
            .forRoutes({ path: 'api/v1/user/invitation', method: common_1.RequestMethod.POST });
    }
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: schema_3.userSchema },
                { name: 'Team', schema: schema_2.teamSchema },
                { name: 'Role', schema: schema_1.roleSchema }
            ]),
            common_module_1.CommonModule,
            mail_module_1.MailModule,
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map