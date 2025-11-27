import { Teacher } from '../models/teacher';
import { TimeSheetEntryType } from '../models/timeSheetEntryType';
import { TimeSheetHourType } from '../models/timeSheetHourType';
import { TimeSheetEntryDetail } from '../models/timeSheetEntryDetail';

export class TimeSheetEntry {
  id:                     number;
  timeSheetHourType:      TimeSheetHourType;
  timeSheetEntryType:      TimeSheetEntryType;
  hours1:                 number;
  hours2:                 number;
  hours3:                 number;
  hours4:                 number;
  hours5:                 number;
  hours6:                 number;
  hours7:                 number;
  billableStandardTotal:  number;
  billableOvertimeTotal:  number;
}