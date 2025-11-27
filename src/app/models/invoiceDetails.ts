import {Invoice} from "./invoice";
import {Course} from "./course";
import {Subject} from "./subject";
import {Fee} from "./fee";
import {Proforma} from "./proforma";
import { TimeTableView } from "./timeTableView";

export class InvoiceDetails {
    id: number;
    description: string;
    unitPrice: number;
    discPerc: number;
    qty: number;
    totalCost: number;
    invoice: Invoice;
    proforma: Proforma;
    invoiceId: number;
    proformaId: number;
    course: Course;
    subject: Subject;
    fee: Fee;
    error: string;
    prereq: string;
    timeTables: TimeTableView[];
}