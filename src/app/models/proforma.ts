import {Company} from "./company";
import {User} from "./User";
import { InvoiceContact } from "./InvoiceContact";

export class  Proforma {
    id: number;
    description: string;
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
    user: User;
    company: Company;
    invoiceContact: InvoiceContact;
    error: string;
}