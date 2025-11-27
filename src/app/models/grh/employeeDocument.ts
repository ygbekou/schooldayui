import { EmployeeDocumentType } from './employeeDocumentType';
import { Employee } from './employee';

export class EmployeeDocument {
   id: number;
   fileName: string;
   employeeDocumentType: EmployeeDocumentType;
   employee: Employee;
   anotherDocument: number;
}
