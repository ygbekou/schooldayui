import { User } from '../models/User';
import { Course } from '../models/course';

export class CourseRegistration {
  id:         number;
  comments:   string;
  user:       User;
  course:     Course;
  status:     boolean;
}