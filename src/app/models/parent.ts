import { User } from '../models/User';

export class Parent {
  id:         number;
  profession:  string; 
  workPlace:  string; 
  status:     boolean;
  user:       User;
}