"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const app_service_1 = require("./app.service");
const fs = require("fs");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async generatePdf(data) {
        if (!data || !data.htmlContent || data.htmlContent.trim() === '') {
            console.log('Error: No HTML content provided');
            return { pdf_base64: '' };
        }
        const pdfBase64 = await this.appService.generatePdf({ html_content: data.htmlContent });
        console.log('Generated PDF Base64:', pdfBase64);
        fs.writeFile('pdfBase64.txt', pdfBase64, 'utf8', (err) => {
            if (err) {
                console.log('Error writing file:', err);
            }
            else {
                console.log('Archivo pdfBase64.txt creado exitosamente');
            }
        });
        return { pdf_base64: pdfBase64 };
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.GrpcMethod)('HtmlToPdfService', 'GeneratePdf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generatePdf", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map