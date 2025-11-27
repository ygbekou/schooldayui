
import {Fee} from "./fee";
import {Subject} from "./subject";

export class SubjectInvoiceView {

    id: number;

    subject: Subject;

    discPerc: number;

    description: String;

    qty: number;

    totalCost: number;

    cost: number;

    costEnt: number;

    fee: Fee;
}