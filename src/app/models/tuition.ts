import { EventType } from '../models/eventType';
import { SchoolYear } from '../models/schoolYear';

export class Tuition {
  id:             number;
  dueDate:        Date;
  remindDate:     Date;
  amount:         number;
  tuitionType:    EventType;
  schoolYear:     SchoolYear;
}