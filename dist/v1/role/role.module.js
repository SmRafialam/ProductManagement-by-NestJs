"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_controller_1 = require("./role.controller");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("./schema");
const user_module_1 = require("../user/user.module");
const delete_role_middleware_1 = require("./middleware/delete-role.middleware");
const common_module_1 = require("../../common/common.module");
let RoleModule = class RoleModule {
    configure(consumer) {
        consumer
            .apply(delete_role_middleware_1.DeleteRoleMiddleware)
            .forRoutes({ path: 'api/v1/role/:id', method: common_1.RequestMethod.DELETE });
    }
};
RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Role', schema: schema_1.roleSchema }]),
            user_module_1.UserModule,
            common_module_1.CommonModule
        ],
        providers: [role_service_1.RoleService],
        controllers: [role_controller_1.RoleController]
    })
], RoleModule);
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map