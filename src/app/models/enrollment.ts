import { Student } from '../models/student';
import { Class } from '../models/class';
import { Term } from '../models/term';
import { SchoolYear } from '../models/schoolYear';
export class Enrollment {
  id: number;
  modBy: number;
  enrollmentDate: Date;
  student: Student;
  levelClass: Class;
  schoolYear: SchoolYear;
  term: Term;
  error:string;
  hasScholarship : boolean = false;

}