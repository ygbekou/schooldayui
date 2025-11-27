import { Employee } from "./employee";

export class EmployeeDocumentType {
   id: number;
   code: string;
   name: string;
   description: string;
   //autres types de documents
   anotherDocumentType: number;
   emp: Employee;
}
