import { Contract } from './contract';
import { Bank } from './bank';

export class ContractBank
{
    id: number;
    employeeAccountNumber: string;
    state: number;
    contract: Contract;
    bank: Bank;
}
