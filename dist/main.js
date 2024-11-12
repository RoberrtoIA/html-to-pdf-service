"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'htmltopdf',
            protoPath: (0, path_1.join)(__dirname, '..', 'src', 'protos', 'html-to-pdf.proto'),
            url: 'localhost:50051',
            maxReceiveMessageLength: 50 * 1024 * 1024,
            maxSendMessageLength: 50 * 1024 * 1024,
        },
    });
    await app.startAllMicroservices();
}
bootstrap();
//# sourceMappingURL=main.js.map