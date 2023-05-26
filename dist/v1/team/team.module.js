"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_module_1 = require("../../common/common.module");
const schema_1 = require("../user/schema");
const delete_team_middleware_1 = require("./middleware/delete-team.middleware");
const schema_2 = require("./schema");
const team_controller_1 = require("./team.controller");
const team_service_1 = require("./team.service");
let TeamModule = class TeamModule {
    configure(consumer) {
        consumer
            .apply(delete_team_middleware_1.DeleteTeamMiddleware)
            .forRoutes({ path: 'api/v1/team/:id', method: common_1.RequestMethod.DELETE });
    }
};
TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Team', schema: schema_2.teamSchema },
                { name: 'User', schema: schema_1.userSchema }
            ]),
            common_module_1.CommonModule
        ],
        controllers: [team_controller_1.TeamController],
        providers: [team_service_1.TeamService]
    })
], TeamModule);
exports.TeamModule = TeamModule;
//# sourceMappingURL=team.module.js.map