"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const filter_1 = require("./filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configDoc = new swagger_1.DocumentBuilder()
        .setTitle('Pruvit PIM API')
        .setDescription('The detail documentation for pruvit product infomation management API.')
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'API auth',
        description: 'Enter JWT access token',
    }, 'API auth')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'refresh token',
        description: 'Enter JWT refresh token',
    }, 'Refresh auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configDoc);
    swagger_1.SwaggerModule.setup('api/doc/v1', app, document, {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customfavIcon: 'https://static1.smartbear.co/swagger/media/assets/swagger_fav.png'
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new filter_1.HttpExceptionFilter());
    app.enableCors();
    await app.listen(process.env.PORT || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map