import { ExamType } from "./examType";
import { SchoolYear } from "./schoolYear";

export class ExamConfiguration {

    id: number;
    schoolYear:  SchoolYear;
    examType:    ExamType;
    numberOfExams:   number;

    constructor(){
        this.schoolYear = new SchoolYear();
        this.examType = new ExamType();
        this.numberOfExams = 1;
    }

}

