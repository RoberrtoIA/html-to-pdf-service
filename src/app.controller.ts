import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';


import * as fs from 'fs';

// Definimos las interfaces para los tipos
interface HtmlRequest {
  htmlContent: string;  // El HTML que se va a convertir
}

interface PdfResponse {
  pdf_base64: string;  // El PDF en base64
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('HtmlToPdfService', 'GeneratePdf')
  async generatePdf(data: HtmlRequest): Promise<PdfResponse> {
    // console.log('Received data:', data);  // Log para verificar los datos recibidos

    if (!data || !data.htmlContent || data.htmlContent.trim() === '') {
      console.log('Error: No HTML content provided');
      return { pdf_base64: '' };
    }

    // Llamamos al servicio y pasamos los datos correctos
    const pdfBase64 = await this.appService.generatePdf({ html_content: data.htmlContent });

    // Log para verificar el valor retornado
    console.log('Generated PDF Base64:', pdfBase64);


    fs.writeFile('pdfBase64.txt', pdfBase64, 'utf8', (err) => {
      if (err) {
        console.log('Error writing file:', err);
      } else {
        console.log('Archivo pdfBase64.txt creado exitosamente');
      }
    });

    return { pdf_base64: pdfBase64 };  // Devolver pdf_base64 correctamente
  }
}


