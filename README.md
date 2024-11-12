# html-to-pdf-service
HTML a PDF


## 1. Crea el proyectgo
```bash
nest new html-to-pdf-service
```

## 2. Instala el paquete para crear el pdf a partir del html 
`npm install @nestjs/microservices puppeteer`

## 3. Crear una carpeta llamada protos dentro `protos`

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