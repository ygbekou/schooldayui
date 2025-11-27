import {User} from '../models/User';
import {Level} from '../models/level';
import {College} from '../models/college';
import {SchoolYear} from '../models/schoolYear';
export class OnlineRegistration {
  id: number;
  createDate: Date;
  user: User;
  level: Level;
  schoolYear: SchoolYear;
  college: College;
  currentDiploma: string;
  comments: string;
  tempComments: string;
  status: boolean;
  error: string;
  statusString: string;
  event: string;
  send: boolean;
  notes: string;
  typeFormation: string;
}
