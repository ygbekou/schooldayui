import { StudentTuition } from "app/components/studentTuition";

export class PaymentCommitment {
	id: number;
  	amount: number;
	dueDate: Date;
	remindDate: Date;
	comment: string;
	studentTuitionId: number;
	status: boolean;
	enable: boolean;
	error: string;
}