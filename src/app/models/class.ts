import { Level } from '../models/level';
import { Teacher } from '../models/teacher';

export class Class {
  id:           number;
  name:         string;
  capacity:     number;
  nbrStudents:  number;
  level:        Level;
  responsibleTeacher:      Teacher;
}