import { Class } from "./class";
import { SchoolYear } from "./schoolYear";
import { Subject } from "./subject";
import { Term } from "./term";


export class SearchAttendance {
    id: number;
    classe: Class;
    term : Term;
    schoolyear : SchoolYear;
    subject : Subject;
    status : number;
    beginDate: Date;
    endDate: Date;
    
}