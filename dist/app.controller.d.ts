import { AppService } from './app.service';
interface HtmlRequest {
    html_content: string;
}
interface PdfResponse {
    pdf_base64: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    generatePdf(data: HtmlRequest): Promise<PdfResponse>;
}
export {};
