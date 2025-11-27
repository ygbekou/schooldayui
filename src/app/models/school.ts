import {Country} from '../models/country';
export class School {
  id: number;
  country: Country;
  email: string;
  name: string;
  address: string;
  city: string;
  shortName: string;
  phone: string;
  reportHeader: string;
  director: string;
  slogan: string;
  inspector: string;
  showReportHeader: boolean;
  showDefaultPassword: boolean;
  generateRandomPassword: boolean;
  generateMatricule: boolean;
  displayRang: boolean;
  baremPrimaire: number;
  baremCollege: number;
  defaultPassword: string;
  beginTime:string;
  endTime:string;
  lmdUsed:boolean;
  depGrade:string;
  code: string;
}
