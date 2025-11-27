import { College } from "./college";
import {StudentProjectCategory} from "./studentProjectCategory";

export class StudentProject {
  id: number;
  name: string; 
  description: string;
  descriptionDocument: string;
  studentProjectCategory: StudentProjectCategory;
}