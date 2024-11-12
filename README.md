# html-to-pdf-service
HTML a PDF


## 1. Crea el proyectgo
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
  async generatePdf(htmlContent: string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }));

    await browser.close();

    return pdfBuffer.toString('base64');
  }
}
```

## 6. En `app.controller.ts`

```bash
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