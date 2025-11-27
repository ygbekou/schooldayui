import { Country } from '../models/country';
import { College } from '../models/college';
import { SchoolYear } from '../models/schoolYear';
import { Level } from './level';
import {Company} from "./company";
import { StudentProject } from './studentProject';
export class UserJpope {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  companyContact: string;
  post: string;
  sex: string;

}
