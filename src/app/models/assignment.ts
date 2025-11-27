import { Course } from '../models/course';
import { AssignmentResponse } from '../models/assignmentResponse';
import {Doc} from './doc';

export class Assignment {
  id:           number;
  course:       Course = new Course();  
  name:         string;
  description:  string;
  startDate:    Date;
  dueDate:      Date;
  status:       boolean;
  sendEmail:    boolean = false;
  sendSMS:      boolean = false;
  
  files: Doc[];
  assignmentResponses: AssignmentResponse [];
}