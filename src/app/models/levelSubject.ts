import {Subject} from '../models/subject';
import {Term} from '../models/term';
import {Level} from '../models/level';

export class LevelSubject {
  id: number;
  subject: Subject;
  level:  Level;
  term: Term;
  courseNumberHours: number;
  tpNumberHours: number;
  personnalNumberHours: number;
  status: boolean;

}