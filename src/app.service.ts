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


