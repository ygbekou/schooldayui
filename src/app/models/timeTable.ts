import { Course } from './course';
import { Term } from './term';
import { SchoolYear } from './schoolYear';
import { TimePeriod } from './timePeriod';
import { Weekday } from './weekday';
import { Building } from './building';
import { Room } from './room';

export class TimeTable {
  id: number;
  weekday: Weekday;
  beginHour: number; 
  beginMinute: number;
  endHour: number; 
  endMinute: number;
  course: Course;
  term: Term;
  timePeriod: TimePeriod;
  building: Building;
  room: Room;
  isActive: boolean;
  catch_up: boolean;
  dateCatchUpCourse: Date;
}