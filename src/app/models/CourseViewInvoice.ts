import {Subject} from "./subject";
import {Teacher} from "./teacher";
import {Class} from "./class";
import {Term} from "./term";
import {SchoolYear} from "./schoolYear";
import {Fee} from "./fee";
import {Course} from "./course";

export class CourseViewInvoice {

    id: number;

    course: Course;

    /*subject: Subject;

    teacher: Teacher;

    classe: Class;

    term: Term;

    schoolYear: SchoolYear;

    beginDate: Date;

    endDate: Date;

    groupCode: String;

    credit: number;

    creditUnitPrice: number;

    courseGroupDesc: String ;

    maxMark: number;

    dueDate: Date;

    status: number;

    sessionType: number;*/

    discPerc: number;

    description: String;

    qty: number;

    totalCost: number;

    cost: number;

    costEnt: number;

    /*duration: number;*/

    fee: Fee;
}