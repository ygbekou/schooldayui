import { User } from '../models/User';
export class Cico {
  id: number;
  ci: Date;
  co: Date;
  duration: number;
  matricule: string;
  kioskCardNumber: string;
  status = 0;
  user: User;
  name: string;
  reason: string;
  phone: string;
  visitee: string;
  modifiedBy: number;
  time: String;
  type: number;
  currentDate : Date;
}
