# html-to-pdf-service
HTML a PDF


## 1. Crea el proyecto
```bash
nest new html-to-pdf-service
```

## 2. Instala el paquete para crear el pdf a partir del html 
```bash
npm install @nestjs/microservices puppeteer
npm install @grpc/grpc-js
```

## 3. Crear una carpeta llamada protos dentro de `src`

## 4. Crear "html-to-pdf.proto"

```bash
syntax = "proto3";

package htmltopdf;

service HtmlToPdfService {
  rpc GeneratePdf (HtmlRequest) returns (PdfResponse);
}

message HtmlRequest {
  string html_content = 1;
}

message PdfResponse {
  string pdf_base64 = 1;
}
```

## 5. En `app.service.ts`

```bash
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async generatePdf(htmlContent: { html_content: string }): Promise<string> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent.html_content);

    // Generamos el PDF en un buffer
    const pdfBuffer = await page.pdf();
    await browser.close();

    // Diagnóstico: Verificar que el buffer contiene datos
    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.log('Error: No PDF generated');
      return '';  // Retorna un string vacío si no se genera el PDF
    }

    // Diagnóstico: Verificar la conversión a base64
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    // console.log('PDF Base64:', pdfBase64);  // Log para verificar la salida base64

    return pdfBase64;
  }
}
```

## 6. En `app.controller.ts`

```bash
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
```

## 7. En `main.ts`

```bash
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'htmltopdf',
      protoPath: join(__dirname, '..', 'src', 'protos', 'html-to-pdf.proto'),
      url: 'localhost:50051',
      // Límite para el tamaño máximo del mensaje (en bytes)
      maxReceiveMessageLength: 50 * 1024 * 1024, // 50MB, ajusta según sea necesario
      maxSendMessageLength: 50 * 1024 * 1024, // 50MB, ajusta según sea necesario
    },
  });
  await app.listen();
}
bootstrap();
```

## 8. 
```bash
npm run start:dev
```

## Tests:

`https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_band&stacked=h`
`https://lingojam.com/TexttoOneLine`
`https://onlinestringtools.com/replace-string`
`https://github.com/bloomrpc/bloomrpc/releases`