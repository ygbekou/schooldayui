import { Bank } from "./bank";
import { PaymentCommitment } from "./paymentCommitment";
import { User } from "./User";

export class Payment{  
  paymentDate:Date; 
  amount:number;
  rebate:number;
  reference: string;
  slipNumber: string;
  bank: Bank;
  paymentCommitment: PaymentCommitment;
  caissier: User;
  
  bankPaymentDate: Date;
  enable: boolean;
}