import {TimeTableView} from './timeTableView';

export class CourseView {
  id: number;
  name: string;
  code: String;
  objectif: string;
  description: string;
  level: string;
  mark: number;
  maxMark: number;
  beginDate: Date;
  endDate: Date;
  cost: number;
  paid: number;
  studentCourseId: number;
  pay: number;
  toPay: number;
  courseRegistrationId: number;
  studentName: string;
  studentMail: string;
  studentPhone: string;
  status: number;
  statusDesc: string;
  termName: string;
  year: string;
  teacherName: string;
  prereq: string;
  credit: number;
  error: string;
  courseStatus: string;
  courseId: number;
  classe:string;
  sessionTypeDesc: string;
  timeTables: TimeTableView[];
  syllabusName: string;
  groupeCode: string;
  courseNumberHours: number;
  tpNumberHours: number;
  personnalNumberHours: number;
  durationPro: number;
  subject: string;
  beginEndPeriod: string;

  averageMark : number;
	rankNbr : number;

}