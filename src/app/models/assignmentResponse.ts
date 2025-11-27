import { Course } from '../models/course';
import {Doc} from './doc';

export class AssignmentResponse {
  id:             number;
  assignmentId:   number;
  courseId:       number;
  studentId:      number;
  assignmentName: string;
  description:    string;
  matricule:      string;
  firstName:      string;
  lastName:       string;
  middleName:     string;  
  
  files: Doc[];
}