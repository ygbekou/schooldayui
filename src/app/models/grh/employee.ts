import { User } from '../User';
import { Position } from '../position';
import { Department } from '../department';
import { Contract } from './contract';
import { PayDetail } from './payDetail';
import { EmployeeType } from './employeeType';
import { TeacherLevel } from './teacherLevel';
import { SalaryType } from './salaryType';

export class Employee {
  id:         number;
  matricule:  string;
  lastName: string;
  firstName: string;
  middleName: string;
  //comments:   string;
  resume:     string;
  status:     boolean;
  hiredDate:  Date;
  allergy: string;
  user:       User;
  position:   Position;
  name:       string;
  department: Department;
  //contract: Contract;
  payDetail: PayDetail;

  level: TeacherLevel;
  employeeType: EmployeeType;
  
  salaryType: SalaryType;
}
