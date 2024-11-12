import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

// Definimos las interfaces para los tipos
interface HtmlRequest {
  html_content: string;  // El HTML que se va a convertir
}

interface PdfResponse {
  pdf_base64: string;  // El PDF en base64
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // El método gRPC que maneja la solicitud y llama al servicio
  @GrpcMethod('HtmlToPdfService', 'GeneratePdf')
  async generatePdf(data: HtmlRequest): Promise<PdfResponse> {
    // Llamar al servicio para generar el PDF (pasando un objeto con html_content)
    const pdfBase64 = await this.appService.generatePdf({ html_content: data.html_content });
    
    // Devolver el objeto esperado en la respuesta, que contiene pdf_base64
    return { pdf_base64: pdfBase64 };
  }
}
