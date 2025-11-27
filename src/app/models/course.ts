import {Class} from '../models/class';
import {Teacher} from '../models/teacher';
import {Subject} from '../models/subject';
import {Term} from '../models/term';
import {SchoolYear} from '../models/schoolYear';
import {Expense} from './expense';
import {TimeTableView} from './timeTableView'; 
import {CourseGroupeCode} from './courseGroupeCode';

export class Course {
  id: number;
  subject: Subject;
  classe: Class;
  teacher: Teacher;
  maxMark: number;
  credit: number;
  creditUnitPrice: number;
  cost: number;
  costEnt: number;
  duration: number;
  beginDate: Date;
  endDate: Date;
  selected: boolean;
  term: Term;
  schoolYear: SchoolYear;
  prereq: string;
  dueDate: Date;
  timeTables: TimeTableView[];
  expenses: Expense[];
  modifiedBy: number;
  sessionType: number=0;
  sessionTypeDesc: string;
  courseGroupeCode:CourseGroupeCode;
  isSaisieHeuresCours: boolean;
}