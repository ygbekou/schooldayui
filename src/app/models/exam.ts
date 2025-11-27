import { SchoolYear } from './schoolYear';
import { ExamType } from './examType';
import { Course } from './course';
import { Term } from './term';
import {Doc} from './doc';

export class Exam {
  id: number;
  name: string;
  examDate: Date;
  schoolYear: SchoolYear;
  examType: ExamType;
  tpType : string = 'TP0';
  term:Term;
  course: Course;
  ratio: number;
  maxMark: number;
  publishMarks: boolean;
  publishExamMarks: number;
  evaluationType: number;
  modifiedBy:number;
  error:string;
  
  markFiles: Doc[];
}
