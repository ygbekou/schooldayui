import { Country } from '../models/country';
import { College } from '../models/college';
import { SchoolYear } from '../models/schoolYear';
import { Level } from './level';
import {Company} from "./company";
export class User {
  id: number;
  address: string;
  birthDate: Date;
  cityOfBirth: string;
  cityResidence: string;
  email: string;
  emailPersonnel: string;
  userName:string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  cellPhone: string;
  role: number;
  sex: string;
  countryResidence:Country;
  countryResidence1:number;
  countryOrigin:Country;
  currentLocale:string;
  zipCode:string;
  status:boolean;
  token:string;
  online:boolean;
  createDate:Date;
  modDate:Date;
  modifiedBy:Date;
  comments:string;
  college:College;
  level:Level;
  level1:number;
  currentDiploma:string;
  schoolYear:SchoolYear;
  pic:  string;
  name: string;
  event: string;
  sendMail = false;
  fromAdmin= false;
  company: Company;
  cicoStatus: number;
  nationality: Country;
  typeFormation: string;
  seller: User;
  numPieceIdentite: string;

  bourse_bcs: string;
  bourse_merite: string;
  bourse_studynow: string;
  bourse_job: string;
  bourse_sifa: string;

  message: string;
  someDate: Date;

  lastDegree : string;
  natureOfHandicap : string;
  specificNeeds : string;
  hasMedicalCertification : boolean = false;
  professionalProject : string;
  motivation : string;
  isOrphanedFromFather : boolean = false;
  isOrphanedFromMother : boolean = false;
  isDisabled : boolean = false;
  hasNeedyFamily : boolean = false;

  bourseSifaW3 : number;
  userAccess : number;

  allowedToConnect = false;
  currentlyConnected = false; 
  lastLoginDate: Date; 



}
