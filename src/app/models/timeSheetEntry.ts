import { Teacher } from '../models/teacher';
import { TimeSheetEntryType } from '../models/timeSheetEntryType';
import { TimeSheetHourType } from '../models/timeSheetHourType';
import { TimeSheetEntryDetail } from '../models/timeSheetEntryDetail';
import { Course } from './course';

export class TimeSheetEntry {
  id:                     number;
  timeSheetEntryType:     TimeSheetEntryType;
  timeSheetHourType:      TimeSheetHourType; 
  detail1:                TimeSheetEntryDetail;
  detail2:                TimeSheetEntryDetail;
  detail3:                TimeSheetEntryDetail;
  detail4:                TimeSheetEntryDetail;
  detail5:                TimeSheetEntryDetail;
  detail6:                TimeSheetEntryDetail;
  detail7:                TimeSheetEntryDetail;
  totalHours:             number;

  course:                 Course;
}