import { Teacher } from '../teacher';
import { ContractType } from './contractType';
import { Employee } from './employee';
import { PersonType } from './PersonType';

export class Contract {
  id: number;
  number: number;
  cnssNumer: string;
  startDate: Date;
  endDate: Date;
  employee: Employee;
  teacher: Teacher;
  contractType: ContractType;
  personType: PersonType;
}
