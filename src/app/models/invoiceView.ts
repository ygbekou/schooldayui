import { User } from "./User";

export class InvoiceView {
    id: number;
    invoiceId: number;
    companyId: number;
    userId: number;
    proformaId: number;
    description: string;
    ttcToLetter: string;
    number: string;
    reference: string;
    invoiceDate: Date;
    saleCond: string;
    tax: number;
    discountPerc: number;
    costHt: number;
    costTax: number;
    costTtc: number;
    status: number;
    statusDescription: string;
    customerName: string;
    vendeurName: string;
    vendeurId: number;
    


    paymentDate: Date;
    error: string;
}
