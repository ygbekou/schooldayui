import { Course } from './course';
import { Term } from './term';
import { SchoolYear } from './schoolYear';

export class TimeTableView {
  id: number;
  weekdayId: number;
  weekdayName: string;
  timePeriodId: number;
  timePeriodDescription: string;
  beginHour: number; 
  beginMinute: number;
  beginTime: string;
  endHour: number; 
  endMinute: number;
  endTime:  string;
  courseId: number;
  courseName: string;
  termId: number;
  termName: string;
  schoolYearId: number;
  schoolYearName: string;
}