import { Student } from '../models/student';
import { Subject } from '../models/subject';
import { User } from './User';

export class PrerequisitWaiver {
  id: number;
  subject: Subject;
  student: Student;
  waiver: User;
  comments: string;
}