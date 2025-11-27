import { User } from '../models/User';
import { Teacher } from '../models/teacher';

export class Testimony {
  id:             number;
  comments:       string;
  testimonyDate:  Date;
  user:           User;
  approvedBy:     User;
  teacher:        Teacher;
  rank:           number;
  status:         boolean;
}