import {Company} from "./company";
import {User} from "./User";
import { InvoiceContact } from "./InvoiceContact";

export class  Invoice {
    id: number;
    //invoiceType: number;
    description: string;
    number: string;
    //inNumber: string;
    reference: string;
    invoiceDate: Date;
    saleCond: string;
    tax: number;
    discountPerc: number;
    costHt: number;
    costTax: number;
    costTtc: number;
    status: number;
    user: User;
    vendeur: User;
    company: Company;
    invoiceContact: InvoiceContact;
    paymentDate: Date;
    error: string;
    ttcToLetter: string;
}