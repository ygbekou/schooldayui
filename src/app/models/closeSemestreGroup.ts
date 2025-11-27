import { SemestreGroup } from './semestreGroup';
import { SchoolYear } from './schoolYear';
import { Cycle } from './cycle';

export class CloseSemestreGroup {
  id: number;
  semestreGroup: SemestreGroup;
  schoolYear: SchoolYear;
  cycle: Cycle;
  error: string;
  createDate: Date;
}
