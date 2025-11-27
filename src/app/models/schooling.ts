import {Student} from '../models/student';
import {Teacher} from '../models/teacher';
import {EventType} from '../models/eventType';
import {SchoolYear} from '../models/schoolYear';
import {Term} from '../models/term';
import {TimePeriod} from './timePeriod';
export class Schooling {
  id: number;
  student: Student;
  teacher: Teacher;
  eventType: EventType;
  schoolYear: SchoolYear;
  timePeriod: TimePeriod;
  term: Term;
  description: string;
  eventDate: Date;
  sendEmail: boolean = false;
  sendSMS: boolean = false;
  modifiedBy: number;
}