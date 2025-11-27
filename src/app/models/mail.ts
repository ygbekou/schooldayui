import {Class} from './class';
import {SchoolYear} from './schoolYear';
import {User} from './User';
export class Mail {
  id: number;
  sender: User;
  body: string;
  classe: Class;
  subject: string;
  mailGrps: string[];
  schoolYear: SchoolYear;
  modifiedBy: number;
}