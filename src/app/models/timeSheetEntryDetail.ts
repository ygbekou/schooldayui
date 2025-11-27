import { Teacher } from '../models/teacher';
import { TimeSheetEntryType } from '../models/timeSheetEntryType';
import { TimeSheetHourType } from '../models/timeSheetHourType';
import { TimeSheetEntry } from './timeSheetEntry';

export class TimeSheetEntryDetail {
  id:                         number;
  timeSheetEntryType:         TimeSheetEntryType;
  timeSheetHourType:          TimeSheetHourType;
  timeSheetDate:              Date;
  hours:                      number;

  timeSheetEntry:             TimeSheetEntry;
  startTime:                  Date;
  endTime:                    Date;
}