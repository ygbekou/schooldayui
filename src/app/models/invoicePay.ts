import { Bank } from "./bank";
import { User } from "./User";
import { Invoice } from "./invoice";

export class InvoicePay{

  id:number;  
  paymentDate:Date; 
  bankPaymentDate: Date;
  amount:number;
  currency: string;
  comment:string;
  bank: Bank;
  slipNumber: string;
  caissier: User;
  invoice: Invoice;
}