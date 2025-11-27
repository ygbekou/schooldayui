
import {Fee} from "./fee";
import {Subject} from "./subject";
import { InformationChannel } from "./informationChannel";

export class SubjectInvoiceView {

    id: number;

    code: string;

    name: string;

    subject: Subject;

    discPerc: number;

    description: String;

    qty: number;

    totalCost: number;

    cost: number;

    costEnt: number;

	fee: Fee;
	
	informationChannel: string;

    nombre: number;

    visitDate: Date;
}