"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFeatureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_feature_dto_1 = require("./create-feature.dto");
class UpdateFeatureDto extends (0, swagger_1.PartialType)(create_feature_dto_1.CreateFeatureDto) {
}
exports.UpdateFeatureDto = UpdateFeatureDto;
//# sourceMappingURL=update-feature.dto.js.map