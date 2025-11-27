import { Course } from './course';
import { CourseTopic } from './courseTopic';

export class Syllabus {
  id: number;
  syllabusDate: Date;
  comments: string; 
  status: number;
  courseTopic:  CourseTopic;
  course: Course;
}