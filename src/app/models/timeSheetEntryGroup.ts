import { Teacher }                  from '../models/teacher';
import { TimeSheetPeriod }          from '../models/timeSheetPeriod';
import { TimeSheetEntry }           from "./timeSheetEntry";
import { TimeSheetStatus }          from '../models/timeSheetStatus';
import { User } from "./User";

export class TimeSheetEntryGroup {
  id:                     number;
  teacherId:              number;
  approver:               User;
  approverDCMC:               User;
  approverSG:               User;
  timeSheetPeriod:        TimeSheetPeriod;
  timeSheetStatus:        TimeSheetStatus;
  timeSheetStatusDCMC:        TimeSheetStatus;
  timeSheetStatusSG:        TimeSheetStatus;
  hours:                  number;
  comments:               string;


  timeSheetEntries:       TimeSheetEntry[];
  cols:                   any[];

  courseId: number;
}
