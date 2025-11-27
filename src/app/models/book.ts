import { Subject } from '../models/subject';

export class Book {
  id:               number;
  subject:          Subject;
  beginDate:        Date;
  endDate:          Date;
  description:      string;
  status:           boolean;
}