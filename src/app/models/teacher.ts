import { Employee } from './grh/employee';
import { TeacherLevel } from './grh/teacherLevel';
import { TeacherType } from './grh/teacherType';

import { User } from '../models/User';
import { Position } from '../models/position';
import { Department } from './department';
import { Contract } from '../models/grh/contract';
import { PayDetail } from '../models/grh/payDetail';


export class Teacher/* extends Employee*/ {
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
  teacherType: TeacherType;
}
