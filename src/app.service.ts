// import { Injectable } from '@nestjs/common';
// import * as puppeteer from 'puppeteer';

// @Injectable()
// export class AppService {
//   async generatePdf(htmlContent: string): Promise<string> {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlContent);

//     const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }));

//     await browser.close();

//     return pdfBuffer.toString('base64');
//   }
// }

import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async generatePdf(htmlContent: { html_content: string }): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent.html_content);
    const pdfBuffer = await page.pdf();
    await browser.close();

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Error: Empty PDF buffer');
    }

    // Usa Buffer.from() para convertir el buffer a base64
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    return pdfBase64;
  }
}
