import { Periode } from './periode';
import { Employee } from './employee';
import { PaiementMode } from './paiementMode';

export class PaySlip {
  id: number;
  baseSalary: number;
  extraPay: number;
  grossSalary: number;
  CNSSTaxBase: number;
  CNSS: string;
  IRPP: number;
  payrollTax: number;
  socialCharge: number;
  totalInsurence: number;
  payDateAdvance: number;
  loanRepayment: number;
  payDate: Date;
  paiementMode: PaiementMode;
  periode: Periode;
  employee: Employee;
  status: number;

  reportName : string;
}
