import { Level } from './level';
import { Subject } from './subject';

export class CourseTopic {
  id: number;
  description: string; 
  status: boolean;
  subject: Subject;
  level:  Level;
  rank: number;
}