import { User } from '../models/User';

export class Student {
  id:         number;
  matricule:  string;
  registrationDate:  Date;
  status:     number;
  user:       User;
  abandonmentDate: Date;
  abandonmentReason: string;
  sms_status : boolean = false;
  bulletin_status : boolean = false;
  printDegree : boolean = false;
}