import { SchoolYear } from "../schoolYear";
import { ExamType } from "../examType";
import { SemestreGroup } from "../semestreGroup";
import { Cycle } from "../cycle";

export class Evaluation {
    id: number;
    wording: string;
    startDate: Date;
    endDate: Date;
    hourlyCost: number;
    status: number;
    schoolYear: SchoolYear;
    examType: ExamType;
    semestreGroup: SemestreGroup;
    cycle: Cycle;
}
