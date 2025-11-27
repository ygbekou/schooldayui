import { Employee } from './employee';

export class PayDetail {
    id: number;
    baseSalary: number;
    extraPay: number;
    employee: Employee;
    nbPersonInCharge: number;
    amountOfSupport: number;
    status: number;
}
