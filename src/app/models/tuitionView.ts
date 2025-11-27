import { Bank } from "./bank";

export class TuitionView {
  id: number;
  enrollmentId: number;
  studentId: number;
  paymentId: number;
  studentTuitionId: number;
  studentCourseId: number;
  tuitionId: number;
  dueDate: number;
  name: string;
  amount: number;
  paid: number;
  newPay: number;
  newRebate: number;
  balance: number;
  rebate: number;
  modBy: number;

  slipNumber: string;
  bankId: number;
  paymentCommitmentId: number;

  bankPaymentDate:Date;

  enable: boolean;
  hasCommitment: boolean;
  paidComplete: boolean;
}
