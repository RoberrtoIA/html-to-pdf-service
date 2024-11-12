import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

interface HtmlRequest {
  html_content: string;
}

interface PdfResponse {
  pdf_base64: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('HtmlToPdfService', 'GeneratePdf')
  async generatePdf(data: HtmlRequest): Promise<PdfResponse> {
    const pdfBase64 = await this.appService.generatePdf(data.html_content);
    return { pdf_base64: pdfBase64 };
  }
}
