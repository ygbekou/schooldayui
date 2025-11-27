import { TeacherLevel } from './teacherLevel';
import { TeacherType } from './teacherType';
import { TimeSheetEntryType } from '../timeSheetEntryType';

export class HourlyCost {
    id: number;
    amount: number;
    status: number;
    level: TeacherLevel;
    teacherType: TeacherType;
    timeSheetEntryType: TimeSheetEntryType;
}
